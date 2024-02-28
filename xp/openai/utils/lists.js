
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

class Request {
  method = null
  path = null
  query_params = []
  body_params = []

  constructor(method, path, query_params = [], body_params = []) {
    this.method = method
    this.path = path
    this.query_params = query_params
    this.body_params = body_params
  }
}

export const getRequestByName = (name) => {
  switch (name) {
    case 'Create speech': return new Request('POST', '/audio/speech', [], ['model', 'input', 'voice', 'speed'])
    case 'Create transcription': return new Request('GET', '', [], [])
    case 'Create translation': return new Request('GET', '', [], [])
    case 'Create chat completion': return new Request('GET', '', [], [])
    case 'Create embeddings': return new Request('GET', '', [], [])
    case 'Create fine-tuning job': return new Request('GET', '', [], [])
    case 'List fine-tuning jobs': return new Request('GET', '', [], [])
    case 'List fine-tuning events': return new Request('GET', '', [], [])
    case 'Retrieve fine-tuning job': return new Request('GET', '', [], [])
    case 'Cancel fine-tuning': return new Request('GET', '', [], [])
    case 'Upload file': return new Request('GET', '', [], [])
    case 'List files': return new Request('GET', '', [], [])
    case 'Retrieve file': return new Request('GET', '', [], [])
    case 'Delete file': return new Request('GET', '', [], [])
    case 'Retrieve file content': return new Request('GET', '', [], [])
    case 'Create image': return new Request('GET', '', [], [])
    case 'Create image edit': return new Request('GET', '', [], [])
    case 'Create image variation': return new Request('GET', '', [], [])
    case 'List models': return new Request('GET', '', [], [])
    case 'Retrieve model': return new Request('GET', '', [], [])
    case 'Delete a fine-tuned model': return new Request('GET', '', [], [])
    case 'Create moderation': return new Request('GET', '', [], [])
    case 'Create completion (Legacy)': return new Request('GET', '', [], [])
  }

  return new Request('GET', '', [], [])
}
