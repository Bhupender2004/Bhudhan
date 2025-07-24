"""
BhuDhan Translation Generator

This script generates translation files for the BhuDhan application by translating
English strings to Hindi, Punjabi, Tamil, and Telugu using the translator module.

Usage:
    python generate_translations.py --input translations/en.json --output translations/

Requirements:
    pip install torch transformers sentencepiece sacremoses
"""

import argparse
import os
import json
import sys
from typing import Dict, List
from translator import translate_json, LANGUAGE_CODES

def ensure_dir(directory):
    """Ensure that a directory exists."""
    if not os.path.exists(directory):
        os.makedirs(directory)

def load_english_strings(input_file: str) -> Dict:
    """Load English strings from a JSON file."""
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading English strings: {e}")
        sys.exit(1)

def generate_translations(english_strings: Dict, output_dir: str, languages: List[str]):
    """Generate translation files for each language."""
    ensure_dir(output_dir)
    
    # Save the original English strings
    with open(os.path.join(output_dir, 'en.json'), 'w', encoding='utf-8') as f:
        json.dump(english_strings, f, ensure_ascii=False, indent=2)
    
    # Translate to each language
    for lang_code in languages:
        if lang_code == 'en':
            continue
            
        print(f"Translating to {LANGUAGE_CODES[lang_code]}...")
        translated_strings = translate_json(english_strings, 'en', lang_code)
        
        # Save translated strings
        output_file = os.path.join(output_dir, f"{lang_code}.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(translated_strings, f, ensure_ascii=False, indent=2)
        
        print(f"Saved {LANGUAGE_CODES[lang_code]} translations to {output_file}")

def main():
    parser = argparse.ArgumentParser(description="Generate translation files for BhuDhan application")
    
    # Define command-line arguments
    parser.add_argument("--input", type=str, required=True, 
                        help="Input JSON file with English strings")
    parser.add_argument("--output", type=str, default="translations", 
                        help="Output directory for translation files")
    parser.add_argument("--languages", type=str, default="hi,pa,ta,te", 
                        help="Comma-separated list of language codes to generate")
    
    args = parser.parse_args()
    
    # Parse languages
    languages = ['en'] + [lang.strip() for lang in args.languages.split(',')]
    
    # Validate languages
    for lang in languages:
        if lang not in LANGUAGE_CODES:
            print(f"Error: Unsupported language code '{lang}'")
            print(f"Supported languages: {', '.join(LANGUAGE_CODES.keys())}")
            sys.exit(1)
    
    # Load English strings
    english_strings = load_english_strings(args.input)
    
    # Generate translations
    generate_translations(english_strings, args.output, languages)
    
    print("Translation generation complete!")

if __name__ == "__main__":
    main()
