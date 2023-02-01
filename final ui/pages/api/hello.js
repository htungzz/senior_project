// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* Notes from: https://nextjs.org/learn/basics/api-routes/creating-api-routes
req is an instance of http.IncomingMessage, plus some pre-built middlewares.
res is an instance of http.ServerResponse, plus some helper functions.
*/

export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' })
}

