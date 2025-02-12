import { Router, Request, Response } from 'express';

const router = Router();

// Health
router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

// Get Litellm Models
router.get('/api/options/models', (req: Request, res: Response) => {
    const models = ['modelA', 'modelB', 'modelC'];
    res.json(models);
});

// Get Agents
router.get('/api/options/agents', (req: Request, res: Response) => {
    const agents = ['agentX', 'agentY', 'agentZ'];
    res.json(agents);
});

// Get Security Analyzers
router.get('/api/options/security-analyzers', (req: Request, res: Response) => {
    const analyzers = ['analyzer1', 'analyzer2'];
    res.json(analyzers);
});

// Get Config
router.get('/api/options/config', (req: Request, res: Response) => {
    const config = { setting: 'default' };
    res.json(config);
});

// List Files
router.get('/api/conversations/:conversation_id/list-files', (req: Request, res: Response) => {
    const conversationId = req.params.conversation_id;
    const pathQuery = req.query.path || '/';
    const files = ['file1.txt', 'file2.txt'];
    res.json({ conversation_id: conversationId, path: pathQuery, files });
});

// Select File
router.get('/api/conversations/:conversation_id/select-file', (req: Request, res: Response) => {
    const filePath = req.query.file;
    if (!filePath) {
        return res.status(422).json({ error: 'File query parameter is required' });
    }
    res.json({ file: filePath, content: 'Dummy file content' });
});

// Upload Files
router.post('/api/conversations/:conversation_id/upload-files', (req: Request, res: Response) => {
    // Dummy implementation; in production, use middleware to process file uploads
    res.json({ message: 'Files uploaded successfully' });
});

// Save File
router.post('/api/conversations/:conversation_id/save-file', (req: Request, res: Response) => {
    const { path, content } = req.body;
    if (!path || !content) {
        return res.status(400).json({ error: 'File path and content are required' });
    }
    res.json({ message: 'File saved successfully' });
});

// Zip Current Workspace
router.get('/api/conversations/:conversation_id/zip-directory', (req: Request, res: Response) => {
    res.json({ message: 'Workspace zipped successfully', zipUrl: 'http://example.com/workspace.zip' });
});

// Submit Feedback
router.post('/api/conversations/:conversation_id/submit-feedback', (req: Request, res: Response) => {
    const feedback = req.body;
    res.json({ message: 'Feedback submitted successfully', feedback });
});

// Get Remote Runtime Config
router.get('/api/conversations/:conversation_id/config', (req: Request, res: Response) => {
    res.json({ session_id: 'dummy_session', runtime_id: 'dummy_runtime' });
});

// Get VSCode URL
router.get('/api/conversations/:conversation_id/vscode-url', (req: Request, res: Response) => {
    res.json({ vscodeUrl: 'vscode://dummy-url' });
});

// Get Web Hosts
router.get('/api/conversations/:conversation_id/web-hosts', (req: Request, res: Response) => {
    res.json({ hosts: ['http://localhost:52529', 'http://localhost:56001'] });
});

// New Conversation
router.post('/api/conversations', (req: Request, res: Response) => {
    const newConversation = {
        conversation_id: 'conv_' + Date.now(),
        title: req.body.selected_repository || 'New Conversation'
    };
    res.json(newConversation);
});

// Search Conversations
router.get('/api/conversations', (req: Request, res: Response) => {
    const resultSet = {
        results: [
            { conversation_id: 'conv_1', title: 'Conversation 1' },
            { conversation_id: 'conv_2', title: 'Conversation 2' }
        ],
        next_page_id: null
    };
    res.json(resultSet);
});

// Get Conversation by ID
router.get('/api/conversations/:conversation_id', (req: Request, res: Response) => {
    const conversationId = req.params.conversation_id;
    res.json({
        conversation_id: conversationId,
        title: 'Dummy Conversation',
        last_updated_at: new Date().toISOString(),
        status: 'STOPPED',
        selected_repository: null,
        created_at: new Date().toISOString()
    });
});

// Update Conversation
router.patch('/api/conversations/:conversation_id', (req: Request, res: Response) => {
    res.json(true);
});

// Delete Conversation
router.delete('/api/conversations/:conversation_id', (req: Request, res: Response) => {
    res.json(true);
});

// Load Settings
router.get('/api/settings', (req: Request, res: Response) => {
    const settings = {
        language: 'en',
        agent: 'default',
        max_iterations: 10,
        security_analyzer: 'basic',
        confirmation_mode: false,
        llm_model: 'gpt-4',
        llm_api_key: null,
        llm_base_url: null,
        remote_runtime_resource_factor: 1,
        github_token: null,
        enable_default_condenser: false,
        user_consents_to_analytics: true,
        github_token_is_set: false
    };
    res.json(settings);
});

// Store Settings
router.post('/api/settings', (req: Request, res: Response) => {
    const newSettings = req.body;
    res.json({ message: 'Settings stored successfully', newSettings });
});

// Get Github Repositories
router.get('/api/github/repositories', (req: Request, res: Response) => {
    const page = req.query.page || 1;
    const per_page = req.query.per_page || 10;
    const sort = req.query.sort || 'pushed';
    const installation_id = req.query.installation_id || null;
    res.json({ page, per_page, sort, installation_id, repositories: [{ name: 'repo1' }, { name: 'repo2' }] });
});

// Get Github User
router.get('/api/github/user', (req: Request, res: Response) => {
    res.json({ login: 'dummyUser', id: 123456 });
});

// Get Github Installations
router.get('/api/github/installations', (req: Request, res: Response) => {
    res.json([{ id: 1 }, { id: 2 }]);
});

// Search Github Repositories
router.get('/api/github/search/repositories', (req: Request, res: Response) => {
    const query = req.query.query;
    const per_page = req.query.per_page || 5;
    const sort = req.query.sort || 'stars';
    const order = req.query.order || 'desc';
    if (!query) {
        return res.status(422).json({ error: 'Query parameter is required' });
    }
    res.json({ query, per_page, sort, order, results: [{ name: 'searchRepo1' }] });
});

// Get Trajectory
router.get('/api/conversations/:conversation_id/trajectory', (req: Request, res: Response) => {
    const trajectory = [{ event: 'start' }, { event: 'update' }, { event: 'end' }];
    res.json(trajectory);
});

export default router;
