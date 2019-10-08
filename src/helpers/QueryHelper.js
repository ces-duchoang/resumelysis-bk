const { DEF_PAGE_SIZE } = require("../config");
const { PageOverflowMsg } = require("../Messages");

const paginateQuery = async (query, options) => {
  const { Doc, page = 1, pageSize = DEF_PAGE_SIZE } = options;
  if (!Doc) return { code: 500 };
  const total = await Doc.countDocuments(query).exec();
  const pages = Math.ceil(total / pageSize);
  if (page > pages) return { code: 400, message: PageOverflowMsg };
  query.sort("_id");
  query.skip(pageSize * (page - 1)).limit(pageSize);
  const data = await query.exec();
  return { pages, page, data };
};

module.exports = { paginateQuery };
