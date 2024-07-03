import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AddAccount from "../components/admin/account/add";

import Info from "../components/admin/page/info";

import ExperiencesList from "../components/admin/experience/list";
import AddExperience from "../components/admin/experience/add";
import EditExperience from "../components/admin/experience/edit";

import EducationsList from "../components/admin/education/list";
import AddEducation from "../components/admin/education/add";
import EditEducation from "../components/admin/education/edit";

import ProjectsList from "../components/admin/project/list";
import AddProject from "../components/admin/project/add";
import EditProject from "../components/admin/project/edit";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/account/add" element={<AddAccount />} />
      <Route path="/info" element={<Info />} />

      <Route path="/experience" element={<ExperiencesList />} />
      <Route path="/experience/add" element={<AddExperience />} />
      <Route path="/experience/edit/:id" element={<EditExperience />} />

      <Route path="/education" element={<EducationsList />} />
      <Route path="/education/add" element={<AddEducation />} />
      <Route path="/education/edit/:id" element={<EditEducation />} />

      <Route path="/project" element={<ProjectsList />} />
      <Route path="/project/add" element={<AddProject />} />
      <Route path="/project/edit/:id" element={<EditProject />} />
    </Routes>
  );
};

export default AdminRoutes;

