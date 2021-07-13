
const renderCategory = (request, response) => {
      let fullname = `${request.user.firstname} ${request.user.lastname}`;
      return response.render("pages/category", {title: 'Categorías', username: fullname});
  }

  module.exports = {
    renderCategory,
  }

