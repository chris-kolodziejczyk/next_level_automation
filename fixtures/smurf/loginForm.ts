export const validPassword = 'correct-password';

export const loginFormHtml = `
  <form aria-label="Login form">
    <label>
      Email
      <input name="email" type="email" />
    </label>
    <label>
      Password
      <input name="password" type="password" />
    </label>
    <button type="submit">Sign in</button>
    <p data-testid="flash-message" role="status"></p>
  </form>
  <script>
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      const email = form.elements.email.value;
      const password = form.elements.password.value;
      const message = document.querySelector('[data-testid="flash-message"]');

      message.textContent = password === '${validPassword}'
        ? 'Welcome ' + email
        : 'Invalid credentials';
    });
  </script>
`;
