import React, { useState } from "react";
import axios from "axios";
import Delete from "../Image/delete.png";
import Save from "../Image/save.png";
import Bookmark from "../Image/bookmark.png";
import Alert from "./Alert";
import { jwtDecode } from "jwt-decode";

const NewsItem = ({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source,
  signedin,
  setArticles,
  articles,
  content,
  _id,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [savedMessage, setSavedMessage] = useState({
    showAlert: false,
    alertMessage: "",
  });
  const [deleteMessage, setDeleteMessage] = useState({
    showAlert: false,
    alertMessage: "",
  });

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  const saveArticle = async () => {
    if (bookmarked) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/articles/addarticle",
        {
          user: userId,
          source,
          author,
          title,
          description,
          url: newsUrl,
          urlToImage: imageUrl,
          publishedAt: date,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setBookmarked(true);
      setSavedMessage({ showAlert: true, alertMessage: "Article is Saved." });
      setTimeout(
        () => setSavedMessage({ showAlert: false, alertMessage: "" }),
        1000
      );
    } catch (error) {
      console.error("Error:", error);
      setSavedMessage({
        showAlert: true,
        alertMessage: "Failed to save the article.",
      });
    }
  };

  const deleteArticle = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/articles/deletearticle/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setArticles(articles.filter((curr) => curr._id !== _id));
      setDeleteMessage({
        showAlert: true,
        alertMessage: "Article has been Deleted.",
      });
      setTimeout(
        () => setDeleteMessage({ showAlert: false, alertMessage: "" }),
        1000
      );
    } catch (error) {
      console.error("Error:", error);
      setDeleteMessage({
        showAlert: true,
        alertMessage: "Failed to delete the article.",
      });
    }
  };

  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={
            imageUrl ||
            "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author || "unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <div className="alignment">
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
            {signedin && (
              <img
                style={{ width: "48px", padding: "5px" }}
                src={bookmarked ? Bookmark : Save}
                alt="save"
                onClick={saveArticle}
              />
            )}
            {!signedin && (
              <img
                style={{ width: "48px", padding: "5px" }}
                src={Delete}
                alt="delete"
                onClick={deleteArticle}
              />
            )}
          </div>
        </div>
        {savedMessage.showAlert && (
          <Alert
            message={savedMessage.alertMessage}
            onClose={() =>
              setSavedMessage({ showAlert: false, alertMessage: "" })
            }
          />
        )}
        {deleteMessage.showAlert && (
          <Alert
            message={deleteMessage.alertMessage}
            onClose={() =>
              setDeleteMessage({ showAlert: false, alertMessage: "" })
            }
          />
        )}
      </div>
    </div>
  );
};

export default NewsItem;