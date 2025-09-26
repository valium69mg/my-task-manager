
class ProjectController {

    constructor(projectService) {
        if (ProjectController.instance){
            return ProjectController.instance;
        }
        this.projectService = projectService;
        ProjectController.instance = this;
    }

    async createProject(req, res) {
        try {
        
        const projectData = req.body;
        const id = req.params.id;

        const response = await this.projectService.createProject(projectData, id);

        return res.status(response.status).json(response);

        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async updateProject(req, res) {
        try {

            const projectData = req.body;

            const response = await this.projectService.updateProject(projectData);

            return res.status(response.status).json(response);

        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async getAllProjects(req, res) {
        try {

            return await this.projectService.getAllProjects();
        
        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async getProjectById(req,res) {
        try{
            const id = req.params.id;
            const project = await this.projectService.getProjectById(id);
            return res.status(200).json(project);
        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async deleteProjectById(req, res) {
        try{
            const id = req.params.id;
            const response = await this.projectService.deleteProjectById(id);
            return res.status(response.status).json(response);
        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async createProjectUsers(req, res) {
        try {

            const data = req.body;
            const response = await this.projectService.createProjectUsers(data.userIds, data.projectId);

            return res.status(response.status).json(response);

        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async deleteProjectUsers(req, res) {
        try {
            const userIds = req.body;

            let response = await this.projectService.deleteProjectUsers(userIds);

            return res.status(response.status).json(response);

        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

}