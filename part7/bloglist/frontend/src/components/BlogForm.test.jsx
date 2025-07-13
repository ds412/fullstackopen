import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> calls the event handler with the right details when a new blog is created", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();
  const container = render(
    <BlogForm createBlog={createBlog} username={"username"} />,
  ).container;

  const title = container.querySelector("#blogTitle-input");
  const author = container.querySelector("#blogAuthor-input");
  const url = container.querySelector("#blogUrl-input");
  const sendButton = screen.getByText("create");

  await user.type(title, "Blog title");
  await user.type(author, "Blog author");
  await user.type(url, "Blog url");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Blog title");
  expect(createBlog.mock.calls[0][0].author).toBe("Blog author");
  expect(createBlog.mock.calls[0][0].url).toBe("Blog url");
});
