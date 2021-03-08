<script>
  let show = false
</script>

<style>
  section {
    display: grid;
    place-content: center;
  }

  .show {
    color: var(--textColor);
    text-decoration: none;
    border-bottom: 2px solid var(--primary);
    cursor: pointer;
  }
</style>

<section>
  <div>
    {#if !show}
    <h3 class:show={!show} on:click={() => show = true}>Contact</h3>
    {:else}
    <h3>Contact</h3>
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot=“bot-field”>
      <input type="hidden" name="form-name" value="contact" /> 
      
      <div>
        <label for="name">Name</label>
        <input type="name" name="name" />
      </div>
      
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" />
      </div>
      
      <div>
        <label for="message">Message</label>
        <textarea name="message" />
      </div>
      
      <button type="submit">Send</button>
    </form>
    {/if}
  </div>
</section>