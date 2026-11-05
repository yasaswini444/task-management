
package com.example.taskmanager.service;

import com.example.taskmanager.exception.ResourceNotFoundException;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TaskStatus;
import com.example.taskmanager.repository.TaskRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task task;

    @BeforeEach
    void setUp() {
        task = new Task("Learn Jenkins", "Understand CI/CD");
    }

    @Test
    void shouldCreateTask() {

        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.createTask(task);

        assertNotNull(result);
        assertEquals("Learn Jenkins", result.getTitle());

        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void shouldReturnAllTasks() {

        when(taskRepository.findAll()).thenReturn(java.util.List.of(task));

        var result = taskService.getAllTasks();

        assertEquals(1, result.size());
        assertEquals("Learn Jenkins", result.get(0).getTitle());
    }

    @Test
    void shouldUpdateTask() {

        Task updatedTask = new Task(
                "Learn Jenkins Advanced",
                "Understand Jenkins pipelines"
        );

        updatedTask.setStatus(TaskStatus.IN_PROGRESS);

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        when(taskRepository.save(any(Task.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Task result = taskService.updateTask(1L, updatedTask);

        assertEquals("Learn Jenkins Advanced", result.getTitle());
        assertEquals(TaskStatus.IN_PROGRESS, result.getStatus());
    }

    @Test
    void shouldThrowExceptionWhenTaskNotFound() {

        when(taskRepository.findById(100L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> taskService.updateTask(100L, task)
        );
    }

    @Test
    void shouldDeleteTask() {

        when(taskRepository.existsById(1L)).thenReturn(true);

        assertDoesNotThrow(() -> taskService.deleteTask(1L));

        verify(taskRepository, times(1)).deleteById(1L);
    }
}
