// test("a placeholder test", () => {
//     expect(2 + 2).toBe(4)
// })

const request = require("supertest")
const server = require("../server")

test("get /", async() => {
    const res = await request(server).get("/")
    //console.log(res)
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toBe("Welcome to our API")
})