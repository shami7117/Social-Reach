import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/contact/Contact"
import Home from "../src/components/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import Signin from "./pages/sign-in/Signin";
import Faq from "./pages/faq/Faq";
import Group from "./pages/dashboard/Group";
import GroupManager from "./pages/manager/Group";
import Dashboard from "./pages/dashboard/Dashboard";
import Pages from "./pages/dashboard/Pages";
import Instagram from "./pages/dashboard/Instagram";
import PostNotification from "./pages/dashboard/PostNotification";
import TemplateFacebook from "./pages/dashboard/facebooktemplate/TemplateFacebook";
import Post from "./pages/dashboard/facebooktemplate/Post";
import Post2 from "./pages/dashboard/instagramtemplate/Post2";
import TemplateInstagram from "./pages/dashboard/instagramtemplate/TemplateInstagram";
import Post3 from "./pages/dashboard/emailtemplate/Post3";
import TemplateEmail from "./pages/dashboard/emailtemplate/TemplateEmail";
import ImageGallery from "./pages/dashboard/imagegallery/ImageGallery";
import VideoGallery from "./pages/dashboard/videogallery/VideoGallery";
import Join from "./pages/dashboard/jointeam/Join";
import Profile from "./pages/dashboard/profile/Profile";
import Refferals from "./pages/dashboard/Refferals/Refferals";
import Billing from "./pages/dashboard/billing/Billing";
import Started from "./pages/dashboard/gettingstarted/Started";
import FaqDashboard from "./pages/dashboard/faq/FaqDashboard";
import Privacy from "./pages/dashboard/privacy-policy/Privacy";
import Terms from "./pages/dashboard/terms-service/Terms";
import Email from "./pages/dashboard/email/Email";
import AdminRoutes from "./pages/admin/routes/AdminRoutes";
import User from "./pages/admin/dashboard/user/User";
import Manager from "./pages/admin/dashboard/manager/Manager";
import Help from "./pages/admin/dashboard/help-support/Help";
import Doc from "./pages/admin/dashboard/documentation/Doc";
import Payment from "./pages/admin/dashboard/payment/Payment";
import Reports from "./pages/admin/dashboard/reports/Reports";
import Setting from "./pages/admin/dashboard/setting/Setting";
import Activity from "./pages/admin/dashboard/activity/Activity";
import Management from "./pages/admin/dashboard/account-management/Management";
import Monitoring from "./pages/admin/dashboard/monitoring/Monitoring";
import Overview from "./pages/dashboard/Overview";
import TeamPage from "./pages/dashboard/teampage/TeamPage";
import Facebook from "./pages/dashboard/facebooktempteam/Facebook";
import InstagramTemp from "./pages/dashboard/instatempteam/InstagramTemp";
import Image from "./pages/dashboard/imagesteam/Image";
import Videos from "./pages/dashboard/videostemp/Videos";
import ContactDash from "./pages/dashboard/contact/ContactDash";
import Notification from "./pages/admin/dashboard/notification/Notification";
import ImageUpload from "./pages/admin/dashboard/image-upload/ImageUpload";
import VideoUpload from "./pages/admin/dashboard/video-upload/VideoUpload";
import Instagram2 from "./pages/admin/dashboard/instagram/Instagram2";
import Facebook2 from "./pages/admin/dashboard/facebook/Facebook2";
import AddUser from "./pages/admin/dashboard/add-user/AddUser";
import AddManager from "./pages/admin/dashboard/add-manager/AddManager";
import ManagerMain from "./pages/manager/ManagerDashboard";
import ManagerPages from "./pages/manager/Pages";
import InstagramManager from "./pages/manager/Instagram";
import PostNotificationManager from "./pages/manager/PostNotification";
import OverviewManager from "./pages/manager/Overview";
import TemplateFacebookManager from "./pages/manager/facebooktemplate/TemplateFacebook";
import PostManager from "./pages/manager/facebooktemplate/Post";
import Post2Manager from "./pages/manager/instagramtemplate/Post2";
import TemplateInstagramManager from "./pages/manager/instagramtemplate/TemplateInstagram";
import ImageGalleryManager from "./pages/manager/imagegallery/ImageGallery";
import VideoGalleryManager from "./pages/manager/videogallery/VideoGallery";
import TeamPageManager from "./pages/manager/teampage/TeamPage";
import JoinManager from "./pages/manager/jointeam/Join";
import FacebookManager from "./pages/manager/facebooktempteam/Facebook";
import InstagramTempManager from "./pages/manager/instatempteam/InstagramTemp";
import ImageManagerTeam from "./pages/manager/imagesteam/Image";
import VideosManagerTeam from "./pages/manager/videostemp/Videos";
import ProfileManager from "./pages/manager/profile/Profile";
import BillingManager from "./pages/manager/billing/BillingManager";
import StartedManager from "./pages/manager/gettingstarted/Started";
import FaqManager from "./pages/manager/faq/FaqDashboard";
import ContactManager from "./pages/manager/contact/ContactDash";
import PrivacyManager from "./pages/manager/privacy-policy/Privacy";
import TermsManager from "./pages/manager/terms-service/Terms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/dashboard/group" element={<Group />} />
        <Route path="/dashboard/pages" element={<Pages />} />
        <Route path="/dashboard/contact" element={<ContactDash />} />
        <Route path="/dashboard/instagram" element={<Instagram />} />
        <Route
          path="/dashboard/post-notification"
          element={<PostNotification />}
        />
        <Route path="/dashboard/overview" element={<Overview />} />
        <Route
          path="/dashboard/facebooktemplate/facebook-template"
          element={<TemplateFacebook />}
        />
        <Route path="/dashboard/facebooktemplate/post" element={<Post />} />
        <Route
          path="/dashboard/instagramtemplate/instagram-template"
          element={<TemplateInstagram />}
        />
        <Route path="/dashboard/instagramtemplate/post" element={<Post2 />} />
        <Route
          path="/dashboard/emailtemplate/email-template"
          element={<TemplateEmail />}
        />
        <Route path="/dashboard/emailtemplate/post" element={<Post3 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard/imagegallery/image-gallery"
          element={<ImageGallery />}
        />
        <Route path="/dashboard/team/image" element={<Image />} />
        <Route path="/dashboard/team/videos" element={<Videos />} />
        <Route
          path="/dashboard/imagegallery/video-gallery"
          element={<VideoGallery />}
        />
        <Route path="/dashboard/jointeam/join-team" element={<Join />} />
        <Route path="/dashboard/team/team-page" element={<TeamPage />} />
        <Route
          path="/dashboard/team/facebook-template"
          element={<Facebook />}
        />
        <Route
          path="/dashboard/team/instagram-template"
          element={<InstagramTemp />}
        />
        <Route path="/dashboard/profile/profile" element={<Profile />} />
        <Route path="/dashboard/Refferals/refferal" element={<Refferals />} />
        <Route path="/dashboard/billing" element={<Billing />} />
        <Route path="/dashboard/getting-started" element={<Started />} />
        <Route path="/dashboard/faq" element={<FaqDashboard />} />
        <Route path="/dashboard/privacy-policy/privacy" element={<Privacy />} />
        <Route path="/dashboard/terms-service/terms" element={<Terms />} />
        <Route path="/dashboard/email" element={<Email />} />
        {/* manager  */}
        <Route path="/manager/group" element={<GroupManager />} />
        <Route path="/manager/pages" element={<ManagerPages />} />
        <Route path="/manager/contact" element={<ContactManager />} />
        <Route path="/manager/instagram" element={<InstagramManager />} />
        <Route
          path="/manager/post-notification"
          element={<PostNotificationManager />}
        />
        <Route path="/manager/overview" element={<OverviewManager />} />
        <Route
          path="/manager/facebooktemplate/facebook-template"
          element={<TemplateFacebookManager />}
        />
        <Route path="/manager/facebooktemplate/post" element={<PostManager />} />
        <Route
          path="/manager/instagramtemplate/instagram-template"
          element={<TemplateInstagramManager />}
        />
        <Route path="/manager/instagramtemplate/post" element={<Post2Manager />} />
      
        <Route path="/Manager" element={<ManagerMain/>} />
        <Route
          path="/manager/imagegallery/image-gallery"
          element={<ImageGalleryManager />}
        />
        <Route path="/manager/team/image" element={<ImageManagerTeam />} />
        <Route path="/manager/team/videos" element={<VideosManagerTeam />} />
        <Route
          path="/manager/imagegallery/video-gallery"
          element={<VideoGalleryManager />}
        />
        <Route path="/manager/jointeam/join-team" element={<JoinManager />} />
        <Route path="/manager/team/team-page" element={<TeamPageManager />} />
        <Route
          path="/manager/team/facebook-template"
          element={<FacebookManager />}
        />
        <Route
          path="/manager/team/instagram-template"
          element={<InstagramTempManager />}
        />
        <Route path="/manager/profile/profile" element={<ProfileManager />} />
        <Route path="/dashboard/Refferals/refferal" element={<Refferals />} />
        <Route path="/manager/billing" element={<BillingManager />} />
        <Route path="/manager/getting-started" element={<StartedManager />} />
        <Route path="/manager/faq" element={<FaqManager />} />
        <Route path="/manager/privacy-policy/privacy" element={<PrivacyManager />} />
        <Route path="/manager/terms-service/terms" element={<TermsManager />} />

        {/* admin  */}
        <Route path="/admin" element={<AdminRoutes />} />
        <Route path="/user-management" element={<User />} />
        <Route path={"/manager-management"} element={<Manager />} />
        <Route path={"/support-help-desk"} element={<Help />} />
        <Route path={"/help-documentation"} element={<Doc />} />
        <Route path={"/payment-subscription"} element={<Payment />} />
        <Route path={"/report-analytics"} element={<Reports />} />
        <Route path={"/settings"} element={<Setting />} />
        <Route path={"/all-activities"} element={<Activity />} />
        <Route path={"/logout-account-management"} element={<Management />} />
        <Route path={"/system-health-monitoring"} element={<Monitoring />} />
        <Route path={"/notifications"} element={<Notification />} />
        <Route path={"/content-template"} element={<AdminRoutes />} />
        <Route path={'/image-upload'} element={<ImageUpload />} />
        <Route path={'/video-upload'} element={<VideoUpload />} />
        <Route path={'/instagram'} element={<Instagram2 />} />
        <Route path={'/facebook'} element={<Facebook2 />} />
        <Route path={'/add-user'} element={<AddUser />} />
        <Route path={'/add-manager'} element={<AddManager />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
