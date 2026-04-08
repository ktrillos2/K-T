const fs = require('fs');
const content = `import { notFound } from "next/navigation"
import { getAllProjects, getProjectBySlug } from "@/sanity/lib/queries"
import ProjectClientView from "@/components/project-client-view"
import { Metadata } from "next"
import { Project } from "@/lib/projects"

function mapSanityProjectToClientProject(sanityProject: any): Project {
    return {
        id: sanityProject._id || sanityProject.slug,
        slug: sanityProject.slug,
        title: sanityProject.title,
        description: sanityProject.description || "",
        shortDescription: sanityProject.shortDescription || "",
        year: sanityProject.year || "",
        month: sanityProject.month || "",
        category: sanityProject.category || "",
        tech: sanityProject.tech || [],
        images: {
            hero: sanityProject.hero || "",
            mobile: sanityProject.mobile || sanityProject.hero || "",
            gallery: []
        },
        liveUrl: sanityProject.liveUrl ||const fs = require('f {const content = `import saimport { getAllProjects, getProjectBySlug } from "@/sanityroimport ProjectClientView from "@/components/project-client-view"
impor",import { Metadata } from "next"
import { Project } from "@/lib/ -import { Project } from "@/lib
e
function mapSanityProjectToClientProjems(    return {
        id: sanityProject._id || sanityProject.slug,
    p(        id{ s        slug: sanityProject.slug,
        title: sa          title: sanityProject.titat        description: sanityProjectnc        shortDescription: sanityProject.shortDescrip{         year: sanityProject.year || "",
        month: sanityPwa        month: sanityProject.month || ai        category: sanityProject.categoryyP        tech: sanityProject.tech || [],
      "P        images: {
            hero: sagi            hero              mobile: sanityProject.mobile |is            gallery: []
        },
        liveUrl: sanityProject.lioj        },
        liv          l  impor",import { Metadata } from "next"
import { Project } from "@/lib/ -import { Project } from "@/lib
e
function mapSanityProjectToClientProjems(    return {
        id: sanityProject._id || sanityProject.slug,
 leimport { Project } from "@/lib/ -impoT\e
function mapSanityPrtion: project.description,
            type:        id: sanityProject._id || sanityProject.slug,      p(        id{ s        slug: sanityProject.slug          title: sa          title: sanityProject.tit 6        month: sanityPwa        month: sanityProject.month || ai        category: sanityProject.categoryyP        tech: sanityProject.tech || [],
      "P        images: {
          t      "P        images: {
            hero: sagi            hero              mobile: sanityProject.mobile |is            gallery: []
        },              hero: sagi  ro        },
        liveUrl: sanityProject.lioj        },
        liv          l  impor",import { Metadata Pa        lms        liv          l  impor",import { Meta aimport { Project } from "@/lib/ -import { Project } from "@/lsle
function mapSanityProjectToClientProjems(    return {
      onst        id: sanityProject._id || sanityProject.slug,it leimport { Project } from "@/lib/ -impoT\e
functioapfunction mapSanityPrtion: project.descriptpr      /[slug]/page.tsx', content);
