# BhuDhan Translation System

This directory contains translation files for the BhuDhan application. The translation system supports English, Hindi, Punjabi, Tamil, and Telugu.

## Directory Structure

- `en.json`: English translations (source)
- `hi.json`: Hindi translations
- `pa.json`: Punjabi translations
- `ta.json`: Tamil translations
- `te.json`: Telugu translations

## How to Use

### In React Components

```jsx
import { useTranslation } from '@/lib/hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('dashboard.welcome', { name: 'John' })}</p>
    </div>
  );
}
```

### Dynamic Translation

For dynamic content that's not in the translation files, you can use the `translateText` function:

```jsx
import { useTranslation } from '@/lib/hooks/useTranslation';

function MyComponent() {
  const { translateText } = useTranslation();
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  
  const handleTranslate = async () => {
    const translated = await translateText(originalText);
    setTranslatedText(translated);
  };
  
  return (
    <div>
      <textarea 
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
      />
      <button onClick={handleTranslate}>Translate</button>
      <div>{translatedText}</div>
    </div>
  );
}
```

## Generating Translations

To generate translations for all supported languages:

```bash
npm run generate-translations
```

This will:
1. Check if Python is installed
2. Install required Python packages if needed
3. Generate translations for all supported languages using the Python-based translator

## Adding New Translations

To add new translations:

1. Add the new strings to `en.json`
2. Run `npm run generate-translations` to generate translations for all languages

## Requirements

- Python 3.6 or higher
- PyTorch
- Transformers
- SentencePiece
- Sacremoses

These dependencies will be automatically installed when you run `npm run generate-translations`.

## How It Works

The translation system uses pre-trained machine translation models from Hugging Face's Transformers library. The models are loaded on-demand and cached for better performance.

The system consists of:

1. **Python Backend**: Handles the actual translation using pre-trained models
2. **JavaScript Integration**: Provides a bridge between the Next.js application and the Python backend
3. **React Hooks**: Makes translations easy to use in React components

## Customizing

To add support for additional languages:

1. Add the language code and model names in `scripts/translator.py`
2. Update the `SUPPORTED_LANGUAGES` object in `src/lib/translation/translator.js`
3. Run `npm run generate-translations` to generate translations for the new language
