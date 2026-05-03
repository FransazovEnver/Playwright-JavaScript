const { test, expect } = require('@playwright/test');

// Verify user can add task

test("user can add task", async ({page}) =>{

    //arrange
    await page.goto('http://localhost:8080');

    //act
    await page.fill('#task-input', 'Test task');
    await page.click('#add-task');

    //assert
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test task');
});

// Verify user can delete task
test("user can delete task", async ({page}) =>{
    //arrange
    await page.goto('http://localhost:8080');

    //act
    await page.fill('#task-input', 'Test task 1');
    await page.click('#add-task');
    await page.click('.task .delete-task');

    //assert
    const tasks = await page.$$eval('.task', tasks => tasks.map(
        task => task.textContent
    ));
    expect(tasks).not.toContain('Test task 1');
});

// Verify user can mark a task as complete
test("user can mark task as complete", async ({page}) =>{
    //arrange
    await page.goto('http://localhost:8080');
    
    //act 
    await page.fill('#task-input', 'Test task 2');
    await page.click('#add-task');
    await page.click('.task .task-complete');

    //assert
    const completedTask = await page.$('.task.completed');
    expect(completedTask).not.toBeNull();
});

// Verify user can filter tasks
test("user can filter tasks", async ({page}) =>{
    //arrange
    await page.goto('http://localhost:8080');

     //act 
    await page.fill('#task-input', 'Test task 3');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    await page.selectOption('#filter', 'Completed');

    //assert
    const incompleteTask = await page.$('.task:not(.completed)');
    expect(incompleteTask).toBeNull();

    
});
