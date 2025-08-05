/*===========*****===========easy error parser===========*****===========*/
class Err extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  } custom
}

export default Err