/*===========*****===========custom validation error===========*****===========*/
class Invalidated extends Error {
  constructor(errors = {}, statusCode = 422) {
    
    super("Validation Failed");
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default Invalidated;
