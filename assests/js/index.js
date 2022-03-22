const sixProps = (event) => {
  const name = event.target.innerText
  document.getElementById("user_info").innerText = `Your ${name} is: ${navigator[name]}`
  event.preventDefault()
}