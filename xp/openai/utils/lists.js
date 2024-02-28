
export const getPathList = () => Array.from([
  'OpenAI API',
  'Create speech',
  'Create transcription',
  'Create translation',
  'Create chat completion',
  'Create embeddings',
  'Create fine-tuning job',
  'List fine-tuning jobs',
  'List fine-tuning events',
  'Retrieve fine-tuning job',
  'Cancel fine-tuning',
  'Upload file',
  'List files',
  'Retrieve file',
  'Delete file',
  'Retrieve file content',
  'Create image',
  'Create image edit',
  'Create image variation',
  'List models',
  'Retrieve model',
  'Delete a fine-tuned model',
  'Create moderation',
  'Create completion (Legacy)',
])

export const getQueryParamsList = (method) => {
  switch (method) {
    case 'Create speech': return []
    case 'Create transcription': return []
    case 'Create translation': return []
    case 'Create chat completion': return []
    case 'Create embeddings': return []
    case 'Create fine-tuning job': return []
    case 'List fine-tuning jobs': return []
    case 'List fine-tuning events': return []
    case 'Retrieve fine-tuning job': return []
    case 'Cancel fine-tuning': return []
    case 'Upload file': return []
    case 'List files': return []
    case 'Retrieve file': return []
    case 'Delete file': return []
    case 'Retrieve file content': return []
    case 'Create image': return []
    case 'Create image edit': return []
    case 'Create image variation': return []
    case 'List models': return []
    case 'Retrieve model': return []
    case 'Delete a fine-tuned model': return []
    case 'Create moderation': return []
    case 'Create completion (Legacy)': return []
  }

  return []
}

export const getBodyParamsList = (method) => {
  switch (method) {
    case 'Create speech': return ['model', 'input', 'voice', 'speed']
    case 'Create transcription': return []
    case 'Create translation': return []
    case 'Create chat completion': return []
    case 'Create embeddings': return []
    case 'Create fine-tuning job': return []
    case 'List fine-tuning jobs': return []
    case 'List fine-tuning events': return []
    case 'Retrieve fine-tuning job': return []
    case 'Cancel fine-tuning': return []
    case 'Upload file': return []
    case 'List files': return []
    case 'Retrieve file': return []
    case 'Delete file': return []
    case 'Retrieve file content': return []
    case 'Create image': return []
    case 'Create image edit': return []
    case 'Create image variation': return []
    case 'List models': return []
    case 'Retrieve model': return []
    case 'Delete a fine-tuned model': return []
    case 'Create moderation': return []
    case 'Create completion (Legacy)': return []
  }

  return []
}
