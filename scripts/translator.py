"""
BhuDhan Translator Script

This script provides translation functionality between English and Indian languages
(Hindi, Punjabi, Tamil, and Telugu) using pre-trained models from Hugging Face.

Usage:
    python translator.py --text "Your text here" --source "en" --target "hi"

Requirements:
    pip install torch transformers sentencepiece sacremoses
"""

import argparse
import os
import json
from typing import Dict, List, Optional
import torch
from transformers import MarianMTModel, MarianTokenizer

# Define language codes and their full names
LANGUAGE_CODES = {
    "en": "English",
    "hi": "Hindi",
    "pa": "Punjabi",
    "ta": "Tamil",
    "te": "Telugu"
}

# Define model names for different language pairs
MODEL_NAMES = {
    "en-hi": "Helsinki-NLP/opus-mt-en-hi",
    "hi-en": "Helsinki-NLP/opus-mt-hi-en",
    "en-pa": "Helsinki-NLP/opus-mt-en-pa",
    "pa-en": "Helsinki-NLP/opus-mt-pa-en",
    "en-ta": "Helsinki-NLP/opus-mt-en-ta",
    "ta-en": "Helsinki-NLP/opus-mt-ta-en",
    "en-te": "Helsinki-NLP/opus-mt-en-te",
    "te-en": "Helsinki-NLP/opus-mt-te-en",
}

# Cache for loaded models to avoid reloading
loaded_models = {}

def get_model_and_tokenizer(source_lang: str, target_lang: str):
    """
    Load the appropriate translation model and tokenizer for the given language pair.
    Uses caching to avoid reloading models.
    """
    lang_pair = f"{source_lang}-{target_lang}"
    
    if lang_pair not in MODEL_NAMES:
        raise ValueError(f"Translation from {source_lang} to {target_lang} is not supported")
    
    model_name = MODEL_NAMES[lang_pair]
    
    if model_name in loaded_models:
        return loaded_models[model_name]
    
    print(f"Loading model for {LANGUAGE_CODES[source_lang]} to {LANGUAGE_CODES[target_lang]} translation...")
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    model = MarianMTModel.from_pretrained(model_name)
    
    loaded_models[model_name] = (model, tokenizer)
    return model, tokenizer

def translate_text(text: str, source_lang: str, target_lang: str) -> str:
    """
    Translate text from source language to target language.
    
    Args:
        text: The text to translate
        source_lang: Source language code (e.g., 'en', 'hi')
        target_lang: Target language code (e.g., 'en', 'hi')
        
    Returns:
        Translated text
    """
    if source_lang == target_lang:
        return text
    
    model, tokenizer = get_model_and_tokenizer(source_lang, target_lang)
    
    # Prepare the text for translation
    encoded = tokenizer(text, return_tensors="pt", padding=True)
    
    # Generate translation using the model
    with torch.no_grad():
        output = model.generate(**encoded)
    
    # Decode the generated tokens to text
    translated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    
    return translated_text

def batch_translate(texts: List[str], source_lang: str, target_lang: str) -> List[str]:
    """
    Translate a batch of texts from source language to target language.
    
    Args:
        texts: List of texts to translate
        source_lang: Source language code
        target_lang: Target language code
        
    Returns:
        List of translated texts
    """
    if source_lang == target_lang:
        return texts
    
    model, tokenizer = get_model_and_tokenizer(source_lang, target_lang)
    
    # Prepare the texts for translation
    encoded = tokenizer(texts, return_tensors="pt", padding=True)
    
    # Generate translations using the model
    with torch.no_grad():
        outputs = model.generate(**encoded)
    
    # Decode the generated tokens to texts
    translated_texts = [tokenizer.decode(output, skip_special_tokens=True) for output in outputs]
    
    return translated_texts

def translate_json(json_data: Dict, source_lang: str, target_lang: str) -> Dict:
    """
    Translate all string values in a JSON object from source language to target language.
    
    Args:
        json_data: JSON object with string values to translate
        source_lang: Source language code
        target_lang: Target language code
        
    Returns:
        JSON object with translated string values
    """
    if isinstance(json_data, dict):
        result = {}
        for key, value in json_data.items():
            if isinstance(value, str):
                result[key] = translate_text(value, source_lang, target_lang)
            elif isinstance(value, (dict, list)):
                result[key] = translate_json(value, source_lang, target_lang)
            else:
                result[key] = value
        return result
    elif isinstance(json_data, list):
        result = []
        for item in json_data:
            if isinstance(item, str):
                result.append(translate_text(item, source_lang, target_lang))
            elif isinstance(item, (dict, list)):
                result.append(translate_json(item, source_lang, target_lang))
            else:
                result.append(item)
        return result
    else:
        return json_data

def save_translations_to_file(translations: Dict[str, Dict[str, str]], output_file: str):
    """
    Save translations to a JSON file.
    
    Args:
        translations: Dictionary of translations
        output_file: Path to output file
    """
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)
    print(f"Translations saved to {output_file}")

def translate_file(input_file: str, source_lang: str, target_langs: List[str], output_file: Optional[str] = None):
    """
    Translate all text in a file from source language to target languages.
    
    Args:
        input_file: Path to input file (text or JSON)
        source_lang: Source language code
        target_langs: List of target language codes
        output_file: Path to output file (optional)
    """
    # Determine file type based on extension
    file_ext = os.path.splitext(input_file)[1].lower()
    
    # Read input file
    with open(input_file, 'r', encoding='utf-8') as f:
        if file_ext == '.json':
            data = json.load(f)
        else:
            data = f.read()
    
    # Translate to each target language
    translations = {source_lang: data}
    for target_lang in target_langs:
        if target_lang != source_lang:
            print(f"Translating to {LANGUAGE_CODES[target_lang]}...")
            if isinstance(data, (dict, list)):
                translations[target_lang] = translate_json(data, source_lang, target_lang)
            else:
                translations[target_lang] = translate_text(data, source_lang, target_lang)
    
    # Save translations to file if output file is specified
    if output_file:
        save_translations_to_file(translations, output_file)
    
    return translations

def main():
    parser = argparse.ArgumentParser(description="Translate text between English and Indian languages")
    
    # Define command-line arguments
    parser.add_argument("--text", type=str, help="Text to translate")
    parser.add_argument("--source", type=str, default="en", choices=LANGUAGE_CODES.keys(), 
                        help="Source language code")
    parser.add_argument("--target", type=str, default="hi", choices=LANGUAGE_CODES.keys(), 
                        help="Target language code")
    parser.add_argument("--input-file", type=str, help="Input file to translate (text or JSON)")
    parser.add_argument("--output-file", type=str, help="Output file to save translations")
    parser.add_argument("--all-languages", action="store_true", 
                        help="Translate to all supported languages")
    
    args = parser.parse_args()
    
    # Determine target languages
    target_langs = list(LANGUAGE_CODES.keys()) if args.all_languages else [args.target]
    
    # Translate text or file
    if args.input_file:
        translations = translate_file(args.input_file, args.source, target_langs, args.output_file)
        if not args.output_file:
            print(json.dumps(translations, ensure_ascii=False, indent=2))
    elif args.text:
        for target_lang in target_langs:
            if target_lang != args.source:
                translated = translate_text(args.text, args.source, target_lang)
                print(f"{LANGUAGE_CODES[target_lang]}: {translated}")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
