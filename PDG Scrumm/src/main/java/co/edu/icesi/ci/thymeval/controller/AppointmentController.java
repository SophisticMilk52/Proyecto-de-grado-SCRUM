package co.edu.icesi.ci.thymeval.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import co.edu.icesi.ci.thymeval.model.Appointment;
import co.edu.icesi.ci.thymeval.model.UserApp;
import co.edu.icesi.ci.thymeval.service.AppointmentService;
import co.edu.icesi.ci.thymeval.service.AppointmentServiceInt;
import co.edu.icesi.ci.thymeval.service.UserService;
import co.edu.icesi.ci.thymeval.service.UserServiceInt;

@Controller
public class AppointmentController {

	AppointmentServiceInt appointmentService;
	UserServiceInt userService;
	private Iterable<UserApp> doctors;
	private Iterable<UserApp> patients;

	@Autowired
	public AppointmentController(AppointmentServiceInt appointmentService, UserServiceInt userService) {
		this.userService = userService;
		this.appointmentService = appointmentService;
		doctors = userService.findAllDoctors();
		patients = userService.findAllPatients();
		;
	}

	@GetMapping("/apps/")
	public String indexApps(Model model) {
		model.addAttribute("apps", appointmentService.findAll());
		return "apps/index";
	}
	
	@GetMapping("/apps/admin/")
	public String indexAdminApps(Model model) {
		model.addAttribute("apps", appointmentService.findAll());
		return "apps/admin/index";
	}

	@GetMapping("/apps/admin/add")
	public String addApps(Model model) {
		model.addAttribute("appointment", new Appointment());

		model.addAttribute("doctors", userService.findAllDoctors());
		model.addAttribute("patients", userService.findAllPatients());
		return "apps/admin/add-app";
	}

	@PostMapping("/apps/admin/add")
	public String saveApps(@RequestParam(value = "action", required = true) String action, @Valid Appointment app,
			BindingResult bindingResult, Model model) {
		if (!action.equals("Cancel")) {
			if (bindingResult.hasErrors()) {
				model.addAttribute("doctors", doctors);
				model.addAttribute("patients", patients);
				return "apps/admin/add-app";
			} else
				appointmentService.save(app);
		}
		return "redirect:/apps/admin/";
	}

	@GetMapping("/apps/admin/edit/{id}")
	public String showUpdateApps(@PathVariable("id") long id, Model model) {
		Optional<Appointment> app = appointmentService.findById(id);
		if (app == null)
			throw new IllegalArgumentException("Invalid appointment Id:" + id);
		model.addAttribute("app", app.get());

		model.addAttribute("doctors", userService.findAllDoctors());
		model.addAttribute("patients", userService.findAllPatients());
		return "apps/admin/update-app";
	}

	@PostMapping("/apps/admin/edit/{id}")
	public String updateApp(@PathVariable("id") long id, @RequestParam(value = "action", required = true) String action,
			@Valid Appointment app, BindingResult bindingResult, Model model) {
		if (!action.equals("Cancel")) {
			if (bindingResult.hasErrors()) {
				model.addAttribute("doctors", doctors);
				model.addAttribute("patients", patients);
				return "apps/admin/add-app";
			} else
				appointmentService.save(app);
		}
		return "redirect:/apps/admin/";
	}

	@GetMapping("/apps/admin/del/{id}")
	public String deleteApp(@PathVariable("id") long id) {
		Appointment app = appointmentService.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
		appointmentService.delete(app);
		return "redirect:/apps/admin/";
	}
}
