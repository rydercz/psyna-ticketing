<form method="post" action="/purchase/2">
  <label>
    Jméno a příjmení <input name="name" />
  </label>
  <label>
    E-mail <input name="email" type="email" />
  </label>
  <label>
    Ulice a číslo popisné <input name="street" />
  </label>
  <label>
    Město <input name="city" />
  </label>
  <label>
    PSČ <input name="zip" />
  </label>
  <label>
    Počet lístků <input name="count" type="number" value=1 />
  </label>
  <button>Koupit!</button>
</form>
<style lang="scss">
  label {
    display: block;
    padding: 0.1em;

    input {
      display: block;
    }
  }
</style>

