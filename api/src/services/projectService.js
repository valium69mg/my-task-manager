
class ProjectService {

    constructor(projectRepository){
        if (ProjectService.instance) {
            return ProjectService.instance;
        }
        this.projectRepository = projectRepository;
        ProjectService.instance = this;
    }

    async createProject(project, userId) {
        let success = await this.projectRepository.createProject(project, userId);
        if (success) {
            return {status: 201, message: "Project created successfully"}
        }
        return {status: 500, message: "Project could not be saved"}
    }

    async updateProject(project) {
        let success = await this.projectRepository.updateProject(project);
        if (success) {
            return {status: 201, message: "Project updated successfully"}
        }
        return {status: 500, message: "Project could not be updated"}
    }

    async getAllProjects() {
        let result = await this.projectRepository.getAllProjects();
        return result;
    }

    async getProjectById(id) {
        return await this.projectRepository.getProjectById(id);    
    }

    async deleteProjectById(id) {
        let success = await this.projectRepository.deleteProjectById(id);
        if (success) {
            return {status: 201, message: "Project deleted successfully"}
        }
        return {status: 500, message: "Project could not be deleted"}
    }

}

module.exports = ProjectService;