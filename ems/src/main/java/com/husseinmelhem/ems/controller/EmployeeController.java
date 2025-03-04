package com.husseinmelhem.ems.controller;

import com.husseinmelhem.ems.dto.EmployeeDto;
import com.husseinmelhem.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    // Add Employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    // Get employees Rest api
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
        EmployeeDto employee= employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employee);
    }
    //Get all employees
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employees=employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
    //Update Employee
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id")Long employeeId,@RequestBody EmployeeDto employeeDto){
        EmployeeDto updatedemployee = employeeService.updateEmployee(employeeId,employeeDto);
        return new ResponseEntity<>(updatedemployee,HttpStatus.ACCEPTED);
    }
    //delete Employee
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id")Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Deleted succesfully");
    }
}
