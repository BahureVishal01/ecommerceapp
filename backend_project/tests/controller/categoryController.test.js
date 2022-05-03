const { mockRequest, mockResponse } = require("../mocker");
const jestMock = require("jest-mock");
const categoryModel = require("../../SRC/models/category");
const categoryController = require("../../SRC/controllers/categoryController");

const testPayload = [
    {
        categoryId: 1,
        name: "Electronics"
    },
    {
        categoryId: 2,
        name: "Fashion"
    }
];

if ('Category controller should return error on all category', async () => {
    const spy = jestMock.spyOn(categoryModel, 'listCategories').mockImplementation((callback) => {
        callback(new Error("This is a new error"), null)
    })

    const req = mockRequest();
    const res = mockResponse();

    await categoryController.listCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
        msg: "Error in fetching the categories",
        success: false
    });
});