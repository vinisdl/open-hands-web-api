import { Router, Request, Response } from 'express'
import axios from 'axios'

const router = Router()
const baseUrl = process.env.BACKEND_BASE_URL || 'http://localhost:3000'

const proxyRequest = async (req: Request, res: Response) => {
  // Constrói a URL da API terceira com base no path da requisição recebida
  const targetUrl = baseUrl + req.path
  console.log(targetUrl)
  try {
    const body = {
      method: req.method,
      url: targetUrl,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: req.query,
      data: req.body,
    }
    console.log(body)

    const response = await axios(body)
    res.status(response.status).json(response.data)
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data)
    } else {
      res.status(500).json({ error: error.message })
    }
  }
}

// Health
router.get('/health', proxyRequest)

// API Options
router.get('/api/options/models', proxyRequest)
router.get('/api/options/agents', proxyRequest)
router.get('/api/options/security-analyzers', proxyRequest)
router.get('/api/options/config', proxyRequest)

// Conversações: List Files, Select File, Upload Files, Save File, Zip Directory, Submit Feedback, Config, VSCode URL, Web Hosts
router.get('/api/conversations/:conversation_id/list-files', proxyRequest)
router.get('/api/conversations/:conversation_id/select-file', proxyRequest)
router.post('/api/conversations/:conversation_id/upload-files', proxyRequest)
router.post('/api/conversations/:conversation_id/save-file', proxyRequest)
router.get('/api/conversations/:conversation_id/zip-directory', proxyRequest)
router.post('/api/conversations/:conversation_id/submit-feedback', proxyRequest)
router.get('/api/conversations/:conversation_id/config', proxyRequest)
router.get('/api/conversations/:conversation_id/vscode-url', proxyRequest)
router.get('/api/conversations/:conversation_id/web-hosts', proxyRequest)

// Conversações: Nova, Busca, Get, Update, Delete
router.post('/api/conversations', proxyRequest)
router.get('/api/conversations', proxyRequest)
router.get('/api/conversations/:conversation_id', proxyRequest)
router.patch('/api/conversations/:conversation_id', proxyRequest)
router.delete('/api/conversations/:conversation_id', proxyRequest)

// Settings: Load e Store
router.get('/api/settings', proxyRequest)
router.post('/api/settings', proxyRequest)

// Github Endpoints
router.get('/api/github/repositories', proxyRequest)
router.get('/api/github/user', proxyRequest)
router.get('/api/github/installations', proxyRequest)
router.get('/api/github/search/repositories', proxyRequest)

// Trajectory
router.get('/api/conversations/:conversation_id/trajectory', proxyRequest)

export default router
