import "./Projects.css";
import ScrollBar from "../Windows/ScrollBar";
import ecommerce from "../../assets/ecommerce.png";
import {useRef} from "react";
import WindowComponent from "../Windows/WindowComponent";

function Projects({id}: { id: string }) {
    const scrollableContentRef = useRef(null);


    const stopDrag = (event: any) => {
        event.stopPropagation();
    }


    return (
        <WindowComponent id={id} init_x={Math.floor(Math.random() * 50)} init_y={Math.floor(Math.random() * 50)}>
            <div id="text-editor-container">
                <div id="text-body-container">
                    <div onTouchStartCapture={stopDrag} id="text-editor-inner" ref={scrollableContentRef}>
                        <div id="text-container">
                            <h1 style={{marginTop: 5}} className="project-title">Salaried Ecommerce</h1>
                            <a href="https://github.com/steel-bucket/salaried-ecommerce">
                                <h6 style={
                                    {
                                        marginTop: 0,
                                        marginBottom: 0,
                                        padding: 0,
                                    }
                                }>Github Link</h6>
                            </a>
                            <p className="project-body">
                                I developed a completely production ready ecommerce website for commercial use, for both
                                customers, sellers and administrators. The
                                primary focus was on creating a template for any kind of ecommerce website that can be
                                easily customized to fit the needs of small business owners. It gave way to a website
                                which could
                                be replicated by businesses to build their own online store, which is the project I'm
                                currently working on, a Rust Based CLI for generating Ecommerce Websites.<br/>
                                Work started on July 2024 and I'm still perfecting it.<br/>
                                It can be checked out at
                                <a href="https://salaried-ecommerce.onrender.com/"> salaried-ecommerce.onrender.com</a>
                            </p>
                            <img id='ecommerce' className="text-editor-image" src={ecommerce}></img>
                            <h2>
                                Features:
                            </h2>
                            <ul>
                                <li>Separate dashboards for sellers and admins</li>
                                <li>Multinational currency management</li>
                                <li>Social media metadata</li>
                                <li>Functional Stripe and authentication mechanisms</li>
                                <li>Frontend with 100% type safety</li>
                                <li>Payload CMS ecosystem for content management</li>
                                <li>SEO optimization</li>
                            </ul>
                            <h3>
                                Tech Stack:
                            </h3>
                            <ul
                                style={{
                                    fontSize: 12,
                                }}>
                                <li>NextJS</li>
                                <li>tRPC</li>
                                <li>Payload CMS</li>
                                <li>ExpressJS</li>
                                <li>ShadCN UI</li>
                                <li>Tailwind CSS</li>
                                <li>nodemailer</li>
                                <li>zod</li>
                            </ul>
                            <p className="project-body">
                            </p>
                            <hr className="text-editor-hr"/>

                            <h1 className="project-title">Tweeb</h1>

                            <p className="project-body">
                                This was my first large scale project built in March-April 2024. It's a website that
                                gathers hiring
                                information from twitter and displays it in a more organized way for the use of . It was
                                built with
                                ReactJS and Django(with DjangoRestFramework). The way it works is that the data was web
                                scraped using an Airflow process and passed into a python data wrangling script. The
                                data was then stored in MongoDB and served to the frontend
                                using an API made in Django.<br/> Check it out at
                                <a href="https://tweeb.vercel.app"> tweeb.vercel.app</a>
                            </p>
                            <h2>
                                Repositories:
                            </h2>
                            <ul style={{
                                listStyleType: "none",
                            }}>
                                <li><a href="https://github.com/steel-bucket/Tweeb-frontend">Tweeb-frontend</a></li>
                                <p>Tech Stack</p>
                                <ul>
                                    <li>React JS</li>
                                    <li>react-bootstrap</li>
                                    <li>axios</li>
                                </ul>
                                <li><a href="https://github.com/steel-bucket/Tweeb-API">Tweeb-API</a></li>
                                <p>Tech Stack</p>
                                <ul>
                                    <li>Django</li>
                                    <li>DjangoRestFramework</li>
                                    <li>simpleJWT</li>
                                    <li>MongoDB</li>
                                </ul>
                                <li><a
                                    href="https://github.com/steel-bucket/Tweeb-Data-Wrangling">Tweeb-Data-Wrangling</a>
                                </li>
                                <p>Tech Stack</p>
                                <ul>
                                    <li>pandas</li>
                                    <li>seaborn</li>
                                    <li>BeautifulSoup</li>
                                </ul>
                                <li><a
                                    href="https://github.com/steel-bucket/Tweeb-Data-Pipeline">Tweeb-Data-Pipeline</a>
                                </li>
                                <p>Tech Stack</p>
                                <ul>
                                    <li>Airflow</li>
                                    <li>tweepy</li>
                                </ul>
                            </ul>
                            <hr className=" text-editor-hr"/>

                            <h1 className=" project-title">SalaryGallery</h1>
                            <a href="https://github.com/steel-bucket/SalaryGallery">
                                <h6 style={
                                    {
                                        marginTop: 0,
                                        marginBottom: 0,
                                        padding: 0,
                                    }
                                }>Github Link</h6>
                            </a>

                            {/*https://github.com/steel-bucket/SalaryGallery*/}
                            <p className=" project-body">
                                This is a Web Application for an Image Gallery. It was my introduction to the
                                T3
                                Stack. The T3 stack is a Typescript focused stack that uses Typescript, TailwindCSS
                                and
                                tRPC. It was built
                                in May 2024. The project was built with
                                NextJS, tRPC, TailwindCSS, Clerk, and PostgreSQL. The project is hosted on Vercel
                                and
                                can be found
                                at<br/>
                                <a href="https://t3-todo-eta.vercel.app/">t3-todo-eta.vercel.app/</a>
                            </p>

                            <hr className=" text-editor-hr"/>
                            {/*https://github.com/steel-bucket/Gate*/}
                            <h1 className=" project-title">Gate</h1>
                            <a href="https://github.com/steel-bucket/Gate">
                                <h6 style={
                                    {
                                        marginTop: 0,
                                        marginBottom: 0,
                                        padding: 0,
                                    }
                                }>Github Link</h6>
                            </a>
                            <p className="project-body">
                                It is a Gate Entry CRUD Application. It was built in
                                Dec 2023. The project was built with Django, DjangoRestFramework, and PostgreSQL.
                            </p>
                            <hr className=" text-editor-hr"/>

                            <h1 className=" project-title">FriendsList</h1>
                            <a href="https://github.com/steel-bucket/FriendsList">
                                <h6 style={
                                    {
                                        marginTop: 0,
                                        marginBottom: 0,
                                        padding: 0,
                                    }
                                }>Github Link</h6>
                            </a>
                            <p className="project-body">
                                It is a CRUD Application to store a list of friends. It was built in
                                Feb 2024. The project was built with Ruby on Rails, Materialize UI and PostgreSQL.
                            </p>
                            {/*https://github.com/steel-bucket/Market-Analysis*/}
                            <hr className=" text-editor-hr"/>

                            <h1 className=" project-title">Market Analysis</h1>
                            <a href="https://github.com/steel-bucket/Market-Analysis">
                                <h6 style={
                                    {
                                        marginTop: 0,
                                        marginBottom: 0,
                                        padding: 0,
                                    }
                                }>Github Link</h6>
                            </a>
                            <p className="project-body">
                                It is a basic Market Analysis of california housing data. It was built using the Scikit
                                Learn library in Python. It achieved 66% accuracy. It was built in Jul 2023.
                            </p>
                            <hr className=" text-editor-hr"/>

                            <h1 className=" project-title">Binary Classification using Pytorch</h1>
                            <a href="https://github.com/steel-bucket/Binary-Classification-using-Pytorch">
                                <h6 style={
                                    {
                                        marginTop: 0,
                                        marginBottom: 0,
                                        padding: 0,
                                    }
                                }>Github Link</h6>
                            </a>
                            <p className="project-body">
                                It is a pytorch model to classify a binary value(like if a person has diabetes
                                or not). It was built using the ReLU activation function and L2 Regularization. It
                                was built in Jun 2023.
                            </p>
                        </div>
                    </div>
                    <ScrollBar content_ref={scrollableContentRef}/>
                </div>
            </div>
        </WindowComponent>
    );
}

export default Projects;
