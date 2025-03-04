package com.husseinmelhem.ems.service.impl;

import com.husseinmelhem.ems.dto.EmployeeDto;
import com.husseinmelhem.ems.entity.Employee;
import com.husseinmelhem.ems.exception.ResourceNotFoundException;
import com.husseinmelhem.ems.mapper.EmployeeMapper;
import com.husseinmelhem.ems.repository.EmployeeRepository;
import com.husseinmelhem.ems.service.EmployeeService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Transactional
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("no user with this id"+ employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees=employeeRepository.findAll();
        return employees.stream().map((employee -> EmployeeMapper.mapToEmployeeDto(employee))).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId,EmployeeDto updatedEmployee) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()->
                new ResourceNotFoundException("no user with this id"+ employeeId));
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        employeeRepository.findById(employeeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("no user with this id"+ employeeId));
        employeeRepository.deleteById(employeeId);
    }
}
