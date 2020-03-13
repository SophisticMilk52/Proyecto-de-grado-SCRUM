package co.edu.icesi.ci.thymeval.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import co.edu.icesi.ci.thymeval.model.UserApp;
import co.edu.icesi.ci.thymeval.service.UserService;
import co.edu.icesi.ci.thymeval.validation.Step1;
import co.edu.icesi.ci.thymeval.validation.Step2;
import co.edu.icesi.ci.thymeval.validation.Update;

@Controller
public class UserController {

	UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
		;
	}

    @GetMapping("/login")
    public String login() {
        return "customlogin";
    }
	
	@GetMapping("/users/")
	public String indexUser(Model model) {
		model.addAttribute("users", userService.findAll());
		return "users/index";
	}

	@GetMapping("/users/add1")
	public String addUser1(Model model) {
		model.addAttribute("userApp", new UserApp());
		return "users/add-user1";
	}

	@PostMapping("/users/add1")
	public String saveUser1(@Validated(Step1.class) UserApp user, BindingResult bindingResult,
			@RequestParam(value = "action", required = true) String action, Model model) {
		if (!action.equals("Cancel")) {
			if (bindingResult.hasErrors())
				return "users/add-user1";
			else
			{
		    //    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		     //   user.setPassword(passwordEncoder.encode(user.getPassword()));
				user.setPassword("{noop}"+user.getPassword());
				userService.save(user);
			}
			Optional<UserApp> user2 = userService.findById(user.getId());
			if (user2 == null)
				throw new IllegalArgumentException("Invalid user Id:" + user.getId());
			model.addAttribute("genders", userService.getGenders());
			model.addAttribute("types", userService.getTypes());
			return "users/add-user2";
		}
		return "redirect:/users/";
	}

	@PostMapping("/users/add2")
	public String saveUser2(@Validated(Step2.class) UserApp user, BindingResult bindingResult,
			@RequestParam(value = "action", required = true) String action, Model model) {
		if (!action.equals("Cancel"))
			if (bindingResult.hasErrors()) {
				model.addAttribute("genders", userService.getGenders());
				model.addAttribute("types", userService.getTypes());
				return "users/add-user2";
			} else {
				Optional<UserApp> user2 = userService.findById(user.getId());
				if (user2 == null)
					throw new IllegalArgumentException("Invalid user Id:" + user.getId());
				user.setUsername(user2.get().getUsername());
				user.setPassword(user2.get().getPassword());
				userService.save(user);
			}
		return "redirect:/users/";
	}

	@GetMapping("/users/edit/{id}")
	public String showUpdateForm(@PathVariable("id") long id, Model model) {
		Optional<UserApp> user = userService.findById(id);
		if (user == null)
			throw new IllegalArgumentException("Invalid user Id:" + id);
		model.addAttribute("user", user.get());
		model.addAttribute("genders", userService.getGenders());
		model.addAttribute("types", userService.getTypes());
		return "users/update-user";
	}

	@PostMapping("/users/edit/{id}")
	public String updateUser(@PathVariable("id") long id,
			@RequestParam(value = "action", required = true) String action, @Validated(Update.class) UserApp user,
			BindingResult bindingResult, Model model) {
		if (action != null && !action.equals("Cancel")) {
			if (bindingResult.hasErrors()) {
				model.addAttribute("genders", userService.getGenders());
				model.addAttribute("types", userService.getTypes());
				return "users/update-user";
			}
			Optional<UserApp> user2 = userService.findById(id);
			if (user == null)
				throw new IllegalArgumentException("Invalid user Id:" + id);
			user.setPassword(user2.get().getPassword());
			userService.save(user);
		}
		return "redirect:/users/";
	}

	@GetMapping("/users/del/{id}")
	public String deleteUser(@PathVariable("id") long id) {
		UserApp user = userService.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
		userService.delete(user);
		return "redirect:/users/";
	}
}
