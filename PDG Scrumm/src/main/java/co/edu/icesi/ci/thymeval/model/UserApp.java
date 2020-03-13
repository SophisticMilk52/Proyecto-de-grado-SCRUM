package co.edu.icesi.ci.thymeval.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import co.edu.icesi.ci.thymeval.validation.Step1;
import co.edu.icesi.ci.thymeval.validation.Step2;
import co.edu.icesi.ci.thymeval.validation.Update;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class UserApp {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@NotBlank(groups = { Step1.class, Update.class })
	private String username;

	@NotBlank(groups = Step1.class)
	private String password;
	
	@NotBlank(groups = { Step2.class, Update.class })
	@NonNull
	private String name;

	@Email(message = "El correo debe ser válido", groups = { Step2.class, Update.class })
	private String email;

	private UserType type;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Past (groups = {Step2.class, Update.class})
	private LocalDate birthDate;

	private UserGender gender;

//	@OneToMany
//	private List<Appointment> appointments;
}
