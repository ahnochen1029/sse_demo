using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class StreamController : ControllerBase
{

    public StreamController()
    {

    }

    [HttpGet("numbers")]
    // EventSource實作
    public async Task GetNumbers()
    {
        Response.ContentType = "text/event-stream"; // 设置正确的 MIME 类型

        for (int i = 0; i < 10; i++)
        {
            await Task.Delay(1000); // 模拟一些处理
            var obj = new
            {
                data = i,
                time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            };
            await Response.WriteAsync($"data: {System.Text.Json.JsonSerializer.Serialize(obj)} \n\n"); // 发送数据
            await Response.Body.FlushAsync(); // 确保数据被发送
        }

        // 发送完成消息
        var finish = new
        {
            data = "finish",
            time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
        };
        await Response.WriteAsync($"data: {System.Text.Json.JsonSerializer.Serialize(finish)} \n\n");
        await Response.Body.FlushAsync();


        // await Task.Delay(1000); // 模拟一些处理
        // var obj = new
        // {
        //     data = 1,
        //     time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
        // };
        // await Response.WriteAsync($"data: {System.Text.Json.JsonSerializer.Serialize(obj)} \n\n"); // 发送数据
        // await Response.Body.FlushAsync(); // 确保数据被发送

        // await Task.Delay(1000); // 模拟一些处理
        // obj = new
        // {
        //     data = 2,
        //     time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
        // };
        // await Response.WriteAsync($"data: {System.Text.Json.JsonSerializer.Serialize(obj)} \n\n"); // 发送数据
        // await Response.Body.FlushAsync(); // 确保数据被发送
    }
}