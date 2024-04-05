const url = "https://660ac09dccda4cbc75dbb759.mockapi.io/api/v1/users/"

const getTodos = async () => {
  try {
    return await fetch(url).then((response) => response.json())
  } catch (error) {
   	console.error('ERROR: getTodos()')
		console.warn('error = ', error.message);
  }
};

const postUser = async (loginValue, passwordValue) => {
  try {
	const data = await getTodos()
    let valid = true;
    for (const user of data) {
      if (user.login === loginValue) {
        valid = false;
        console.warn("Уже занято");
        break;
      }
    }
    if (valid) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          login: loginValue,
          password: passwordValue
          // todos: [
          //   {
          //     id: 1,
          //     todo: "Welcome!",
          //   },
          // ],
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(() => {
        console.log("post is succses");
      });
    }
  } catch (error) {
		console.error('ERROR: postUser()')
		console.warn(error.message);
	}
};

const getInputValues = () => {
	return [
		loginValue = document.querySelector("#login").value,
		passwordValue = document.querySelector("#password").value
	]
}

const register = () => {
	const [loginValue, passwordValue] = getInputValues()
	if (!(loginValue && passwordValue)) {
		console.warn('Enter all inputs')
	} else if (passwordValue.length < 8) {
		console.warn('Password must be greater than or equal to 8')
	} else {
		postUser(loginValue, passwordValue)
	}
};

const singIn = () => {
	const [loginValue, passwordValue] = getInputValues()
	loginValue && passwordValue ? postUser(loginValue, passwordValue) : console.error('Enter correctly')
}

const changeMode = (event) => {
	const mode = document.querySelector('#mode')
	const action = document.querySelector('#action')
	switch (mode.textContent) {
		case 'SING IN':
			mode.textContent = 'REGINTER'
			action.textContent = 'register'
			action.setAttribute('onclick', 'register()')
			event.target.textContent = 'sing in'
			break;
		case 'REGINTER':
			mode.textContent = 'SING IN'
			action.textContent = 'sing in'
			action.setAttribute('onclick', 'singIn()')
			event.target.textContent = 'register'
			break
		default:
			console.error('ERROR: changeMode()');
			break;
	}
}