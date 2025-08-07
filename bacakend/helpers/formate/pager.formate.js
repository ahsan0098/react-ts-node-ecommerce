/*===========*****===========resolver pagination===========*****===========*/
const pager = async (totalPages, currentPage, path) => {
    const links = {
        page: `${process.env.APP_URL}/api/v1/${path}?page=${currentPage}`,
        links: {},
        prev: null,
        next: null,
    };

    for (let i = 1; i <= totalPages; i++) {

        links.links[i] = `${process.env.APP_URL}/api/v1/${path}?page=${i}`;
    }

    links.prev = currentPage > 1 ? `${process.env.APP_URL}/api/v1/${path}?page=${currentPage - 1}` : null;
    links.next = currentPage < totalPages ? `${process.env.APP_URL}/api/v1/${path}?page=${currentPage + 1}` : null;

    return links;
};
/*===========*****===========resolver pagination===========*****===========*/


/*===========*****===========imports===========*****===========*/
export default pager;