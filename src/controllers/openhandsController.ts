import { Router } from 'express';

const router = Router();

// Health endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Options endpoints
router.get('/api/options/models', (req, res) => {
  res.json(['modelA', 'modelB']);
});

router.get('/api/options/agents', (req, res) => {
  res.json(['agentA', 'agentB']);
});

router.get('/api/options/security-analyzers', (req, res) => {
  res.json(['analyzerA', 'analyzerB']);
});

router.get('/api/options/config', (req, res) => {
  res.json({ config: 'default' });
});

// Conversations endpoints
router.get('/api/conversations/:conversation_id/list-files', (req, res) => {
  res.json({ files: [] });
});

router.get('/api/conversations/:conversation_id/select-file', (req, res) => {
  res.json({ fileContent: 'dummy file content' });
});

router.post('/api/conversations/:conversation_id/upload-files', (req, res) => {
  res.json({ message: 'files uploaded' });
});

router.post('/api/conversations/:conversation_id/save-file', (req, res) => {
  res.json({ message: 'file saved' });
});

router.get('/api/conversations/:conversation_id/zip-directory', (req, res) => {
  res.json({ zipUrl: 'http://example.com/zip' });
});

router.post('/api/conversations/:conversation_id/submit-feedback', (req, res) => {
  res.json({ feedback: 'submitted' });
});

router.get('/api/conversations/:conversation_id/config', (req, res) => {
  res.json({ sessionId: 'session-id', runtimeId: 'runtime-id' });
});

router.get('/api/conversations/:conversation_id/vscode-url', (req, res) => {
  res.json({ vscodeUrl: 'http://vscode.example.com' });
});

router.get('/api/conversations/:conversation_id/web-hosts', (req, res) => {
  res.json({ hosts: [] });
});

// Conversations operations
router.post('/api/conversations', (req, res) => {
  res.json({ conversation_id: 'new_conversation' });
});

router.get('/api/conversations', (req, res) => {
  res.json({ conversations: [] });
});

router.get('/api/conversations/:conversation_id', (req, res) => {
  res.json({ conversation: {} });
});

router.patch('/api/conversations/:conversation_id', (req, res) => {
  res.json({ updated: true });
});

router.delete('/api/conversations/:conversation_id', (req, res) => {
  res.json({ deleted: true });
});

// Settings endpoints
router.get('/api/settings', (req, res) => {
  res.json({ settings: {} });
});

router.post('/api/settings', (req, res) => {
  res.json({ stored: true });
});

// Github endpoints
router.get('/api/github/repositories', (req, res) => {
  res.json({ repositories: [] });
});

router.get('/api/github/user', (req, res) => {
  res.json({ user: {} });
});

router.get('/api/github/installations', (req, res) => {
  res.json({ installations: [] });
});

router.get('/api/github/search/repositories', (req, res) => {
  res.json({ results: [] });
});

// Trajectory
router.get('/api/conversations/:conversation_id/trajectory', (req, res) => {
  res.json({ trajectory: [] });
});

export default router;
