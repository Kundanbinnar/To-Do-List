package com.example.TaskListApp;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
	


}
