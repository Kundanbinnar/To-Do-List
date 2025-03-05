package com.example.TaskListApp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
	
	@Autowired
	TaskService taskService;
	
	//add
	@PostMapping
	public ResponseEntity<String> addTask(@Valid @RequestBody Task task, BindingResult result) {
		
		if(result.hasErrors()) {
			String errorMsg= result.getFieldError().getDefaultMessage();
			return ResponseEntity.badRequest().body(errorMsg);
		}
		taskService.addTask(task);
		return ResponseEntity.ok("Successfully Added task!!!");
	}
	
	//view 
	@GetMapping
	  public ResponseEntity<List<Task>> viewTask() {
        List<Task> tasks = taskService.viewTask();
        return ResponseEntity.ok().body(tasks); // ✅ Always returns JSON
    }
	
	//deletebyid 
	@DeleteMapping("/{id}")
	public String deleteById(@PathVariable Long id) {
		taskService.deleteById(id);
		return "Successfully Deleted task!!!";
	}
	
	
	@PutMapping("/{id}")
	public String updatedById(@PathVariable Long id ,@RequestBody Task task) {
		taskService.updatedById(id,task);
		return "Successfully Updated the task!!!";
		
	}
	
	@PutMapping("/{id}/complete")
	public ResponseEntity<String> markAsCompleted(@PathVariable long id){
		taskService.markAsCompleted(id);
		return ResponseEntity.ok("Task marked as completed!!!");
	}

}
