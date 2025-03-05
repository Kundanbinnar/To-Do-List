package com.example.TaskListApp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
	
	@Autowired
	TaskRepository taskRepo;

	public void addTask(Task task) {
		taskRepo.save(task);
	}

	public List<Task> viewTask() {
		List<Task> task= taskRepo.findAll();
		 if(task.isEmpty()) {
			throw new IllegalArgumentException("No task Available");
			 
		 }
		 return task;
			
	}

	public void deleteById(Long id) {
		  
		if(id == null || !taskRepo.existsById(id)) {
			throw new IllegalArgumentException("Task With ID" + id + "not found");
		}
		taskRepo.deleteById(id);;
		
	}

	public void updatedById(Long id, Task task) {
		if(id == null || task == null) {
			throw new IllegalArgumentException("Invalid input : Id and task cannot be null");
		}
		
		Optional<Task> task1 = taskRepo.findById(id);
		
		if (task1.isPresent()) {
			
			Task taskExists = task1.get();
			taskExists.setName(task.getName());
			taskExists.setDate(task.getDate());
			taskExists.setStatus(task.getStatus());
			
			taskRepo.save(taskExists);
			
		}else {
			throw new IllegalArgumentException("Task with id "+id+"not found");
		}
		
	}

	public void markAsCompleted(long id) {

         Task task= taskRepo.findById(id).orElseThrow(()-> new IllegalArgumentException("Task with Id "+id+" not found"));
         task.setStatus("Completed");
         taskRepo.save(task);
         
         System.out.println("Notifcation : task "+ task.getName()+"is marked as completed !!!");
		
	}
	
	
	
	
	

}
