<script>
  import {fade} from 'svelte/transition'
  import SocialLinks from '../components/SocialLinks.svelte'
</script>

<style>
  .border {
    padding: 2rem;
    margin: 1rem;
    position: relative;
    z-index: 10;
  }

  form {
    text-align: left;
  }

  form div {
    margin-bottom: 0.5rem;
  }

  h2 {
    color: var(--textColor);
    margin: 0 0 2rem 0;
  }

  button {
    font-weight: 700;
  }

</style>

<div in:fade class="border">
  <h2>Contact</h2>
  <SocialLinks />
  <form in:fade name="contact" method="POST" data-netlify="true" netlify-honeypot=“bot-field”>
    <input type="hidden" name="form-name" value="contact" /> 
    
    <div>
      <label for="name">Name</label>
      <input id="name" type="name" name="name" />
    </div>
    
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" name="email" />
    </div>
    
    <div>
      <label for="message">Message
        <textarea id="messsage" name="message" />
      </label>
    </div>
    
    <button type="submit">Send</button>
  </form>
</div>