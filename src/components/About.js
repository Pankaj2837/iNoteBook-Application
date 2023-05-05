import React from "react";
const About = () => {
  // const a = useContext(NoteContext)
  // useEffect(() =>{
  //   a.update();
  // },[])
  return (
    <div>
      <div classNameName="flex-card-container">
        <div classNameName="flex-card whole-card-clickable">
          <a href="/features/notes-app" target="_blank">
            <div classNameName="header-image">
              <img src="https://cdn.dribbble.com/assets/art-banners/itsa-me-time_dennis-salvatier-52a50b9a8e40c31aed521869f4cf0cb02ccbc069c0aac9b75efd714a7354d415.jpg" alt="Notes app"/>
            </div>
          </a>
        </div>
      </div>
      <h1>Make My Notes</h1>
      <p>
        Make My Notes is the best place to jot down quick thoughts or to save
        longer notes filled with checklists, images, web links, scanned
        documents, handwritten notes, or sketches. And with iCloud, it's easy to
        keep all your devices in sync, so you’ll always have your notes with you
      </p>
    </div>
  );
};

export default About;