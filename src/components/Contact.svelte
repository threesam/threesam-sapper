<script>
  import {fade} from 'svelte/transition'
  // import axios from 'axios'

  let name, email, message, err, sent, buttonText = "Send"

  $: data = {
    name,
    email,
    message
  }

  const resetForm = () => {
    name = ""
    email = ""
    message = ""
    buttonText = "Send"
    err = ""
    sent = false
  }

  // const handleSubmit = (data) => {
  //   buttonText = 'Sending...'
    
  //   axios.post('/api/sendmail', data)
  //     .then(res => {
  //       if(res.data.result !== 'success') {
  //         sent = false
  //         buttonText = 'Failed to Send'
  //         setTimeout(() => {
  //           resetForm()
  //         }, 6969)
  //       } else {
  //         sent = true
  //         buttonText = 'Succesfully Sent'
  //         setTimeout(() => {
  //           resetForm()
  //         }, 6969)
  //       }
  //     })
  //     .catch(e => {
  //       buttonText = 'Failed to Send'
  //     })
  // }
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
  <form in:fade name="contact" method="POST" data-netlify="true" netlify-honeypot=“bot-field”>
    <input type="hidden" name="form-name" value="contact" /> 

    <!-- <pre>{JSON.stringify(data)}</pre> -->
    
    <div>
      <label for="name">Name</label>
      <input bind:value={name} id="name" type="name" name="name" />
    </div>
    
    <div>
      <label for="email">Email</label>
      <input bind:value={email} id="email" type="email" name="email" />
    </div>
    
    <div>
      <label for="message">Message
        <textarea bind:value={message} id="messsage" name="message" />
      </label>
    </div>
    
    <button type="submit">{buttonText}</button>
  </form>
</div>