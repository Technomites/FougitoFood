const Validations = {
    validateEmail: (email) => {
      // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const re =
        /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
      return re.test(email);
    },
    validateName: (name) => {
      const re = /^[\w ]{2,30}$/;
      return re.test(name);
    },
    validatePhone: (phone) => {
      //  const re = /^(\(\d{3}\)[.-]?|\d{3}[.-]?)?\d{3}[.-]?\d{4}$/
      const re = /^(\+\d{1,3}[- ]?)?\d{9}$/;
      return re.test(phone);
    },
    validateEmmail: (text) => {
      var unified_emoji_ranges = [
        "\ud83c[\udf00-\udfff]",
        "\ud83d[\udc00-\ude4f]",
        "\ud83d[\ude80-\udeff]",
      ];
      var regEmoji = new RegExp(unified_emoji_ranges.join("|"), "g");
      console.log(text.match(regEmoji));
      return text.match(regEmoji);
    },
  };
  
  export default Validations;