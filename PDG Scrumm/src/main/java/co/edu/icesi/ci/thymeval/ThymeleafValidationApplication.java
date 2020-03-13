package co.edu.icesi.ci.thymeval;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.thymeleaf.extras.java8time.dialect.Java8TimeDialect;
import co.edu.icesi.ci.thymeval.model.UserApp;
import co.edu.icesi.ci.thymeval.model.UserType;
import co.edu.icesi.ci.thymeval.repository.UserRepository;

@SpringBootApplication
public class ThymeleafValidationApplication {

	@Bean
	public Java8TimeDialect java8TimeDialect() {
		return new Java8TimeDialect();
	}

	public static void main(String[] args) {
		SpringApplication.run(ThymeleafValidationApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner demo(UserRepository userRepository) {
		return (args) -> {
			//BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        
			UserApp user = new UserApp();			
			user.setUsername("admin");
			//user.setPassword(passwordEncoder.encode("123"));
			user.setPassword("{noop}123");
			user.setType(UserType.admin);
			userRepository.save(user);
			
			
			UserApp user2 = new UserApp();			
			user2.setUsername("juan");
			//user2.setPassword(passwordEncoder.encode("123"));
			user2.setPassword("{noop}123");
			user2.setType(UserType.doctor);
			userRepository.save(user2);
			
			
			UserApp user3 = new UserApp();			
			user3.setUsername("ana");
			//user3.setPassword(passwordEncoder.encode("123"));
			user3.setPassword("{noop}123");
			user3.setType(UserType.patient);
			userRepository.save(user3);
			};
		}

}
