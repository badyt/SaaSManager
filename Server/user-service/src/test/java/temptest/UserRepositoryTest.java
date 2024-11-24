package temptest;

import org.example.UserServiceApplication;
import org.example.saasmanager.user.repository.UserRepository;
import org.example.shared.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest(classes = UserServiceApplication.class)
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByEmail() {
        Optional<User> user = userRepository.findByEmail("bady1@gmail.com");
        System.out.println("User: " + user.orElse(null));
    }
}