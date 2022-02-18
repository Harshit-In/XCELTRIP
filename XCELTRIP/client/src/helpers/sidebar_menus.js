const sidebarMenus = [
    {title: "Dashboard", icon:"fas fa-chart-pie", page:"/dashboard"},
    {title: "Transactions", icon:"fas fa-hand-holding-usd", page:"transactions"},
    {title: "Settings", icon:"fas fa-cog", page:"settings"},
    {title: "Page Examples", icon:"far fa-file-alt", childrens:[
        {title: "Sign In", page: "/"},
        {title: "Sign Up", page: "/"},
        {title: "Forgot Password", page: "/forgot-password"},
        {title: "Reset Password", page: "/reset-password"},
        {title: "404 Not Found", page: "/error404"},
        {title: "500 Server Error", page: "/error500"},
    ]},
    {title: "Components", icon:"fas fa-box-open", childrens:[
        {title: "Buttons", page: "/"},
        {title: "Notifications", page: "/"},
        {title: "Forms", page: "/"},
        {title: "Modals", page: "/"},
        {title: "Typography", page: "/"},
    ]},
    
]
export default sidebarMenus;