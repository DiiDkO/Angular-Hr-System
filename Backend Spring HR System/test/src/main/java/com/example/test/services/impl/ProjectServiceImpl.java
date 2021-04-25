package com.example.test.services.impl;

import com.example.test.dtos.CreateProjectDto;
import com.example.test.exceptions.ProjectNotFoundException;
import com.example.test.exceptions.RoleNotFoundException;
import com.example.test.mappers.ProjectMapper;
import com.example.test.models.Project;
import com.example.test.repositories.ProjectRepository;
import com.example.test.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Component
public class ProjectServiceImpl implements ProjectService {
    private ProjectRepository projectRepository;
    private ProjectMapper projectMapper;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public CreateProjectDto create(CreateProjectDto createProjectDto) {
        return projectMapper.toDto(projectRepository.save(projectMapper.fromDto(createProjectDto)));
    }

    @Override
    public CreateProjectDto update(Long id, CreateProjectDto createProjectDto) {
        createProjectDto.setId(id);
        if(projectRepository.findById(id).isEmpty())
            throw getProjectNotFoundExceptionSupplier(id).get();
        return projectMapper.toDto(projectRepository.save(projectMapper.fromDto(createProjectDto)));
    }

    @Override
    public void delete(Long id) {
        if(projectRepository.findById(id).isEmpty())
            throw getProjectNotFoundExceptionSupplier(id).get();
        projectRepository.deleteUserProjectRelation(id);
        projectRepository.deleteById(id);
    }

    @Override
    public CreateProjectDto getById(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(getProjectNotFoundExceptionSupplier(id));
        return projectMapper.toDto(project);
    }

    @Override
    public List<CreateProjectDto> getAll() {
        return projectRepository.findAll()
                .stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
    }
    private Supplier<ProjectNotFoundException> getProjectNotFoundExceptionSupplier(Long projectId) {
        return () -> new ProjectNotFoundException(MessageFormat.format("Project with id \"{0}\" has not been found", projectId));
    }
}
