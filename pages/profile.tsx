import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useActiveProfile, useUpdateProfileDetails } from "@lens-protocol/react-web";
import { getPictureURL, upload } from "../lib/utils";

const Profile = () => {
  const { data: profile, loading } = useActiveProfile();
  const { execute: update, error, isPending } = useUpdateProfileDetails({ profile, upload });
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    attributes: {
      location: "",
      website: "",
      twitter: "",
      instagram: "",
      github: "",
      linkedin: "",
    },
  });

  useEffect(() => {
    if (profile && !loading) {
      console.log(profile);
      const getProfileAttribute = (attribute: string) => {
        return profile.attributes[attribute] ? profile.attributes[attribute].attribute.value : "";
      };
      setFormData({
        ...formData,
        attributes: {
          location: getProfileAttribute("location"),
          website: getProfileAttribute("website"),
          twitter: getProfileAttribute("twitter"),
          instagram: getProfileAttribute("instagram"),
          github: getProfileAttribute("github"),
          linkedin: getProfileAttribute("linkedin"),
        },
      });
    }
  }, [profile, loading]);

  const handleFormChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.currentTarget.id);
    event.currentTarget.id === "name" || event.currentTarget.id === "bio"
      ? setFormData({
          ...formData,
          [event.currentTarget.id]: event.currentTarget.value,
        })
      : setFormData({
          ...formData,
          attributes: {
            ...formData.attributes,
            [event.currentTarget.id]: event.currentTarget.value,
          },
        });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("Uploading data");
    console.log(profile.name, " - ", profile.bio, " - ", profile.coverPicture);
    const result = await update({
      name: formData.name,
      bio: formData.bio,
      coverPicture: profile?.coverPicture,
      attributes: formData.attributes,
    });
    console.log("Uploaded data: ", result);
  };

  return (
    <>
      {profile && !loading && (
        <div className="border rounded shadow-sm bg-white">
          <div
            className="inline-block min-h-max h-36 w-full bg-purple-300"
            style={{
              backgroundImage: `url("/bg.svg")`,
            }}
          ></div>
          <div className="grid grid-cols-4 gap-x-2 pb-10">
            <div className="ml-8 space-y-3">
              <Image
                src={getPictureURL(profile)}
                alt={profile.handle}
                width={135}
                height={135}
                className="rounded-md -mt-16 border-white"
              />
              <div className="flex items-center justify-between">
                <div>
                  {profile.name && <p className="text-lg font-medium">{profile.name}</p>}
                  <p className="-mt-1 text-xs text-lime-700">{profile.handle}</p>
                </div>
              </div>
            </div>
            <div className="pt-6 px-8 col-span-3 w-full">
              <form className="space-y-7 divide-y" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full rounded-md p-2 text-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                      Bio
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <textarea
                        rows={4}
                        name="bio"
                        id="bio"
                        value={formData.bio}
                        onChange={handleFormChange}
                        className="w-full rounded-md p-2 text-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                      Location
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.attributes.location}
                        onChange={handleFormChange}
                        className="w-full rounded-md p-2 text-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                      Website
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="website"
                        id="website"
                        value={formData.attributes.website}
                        onChange={handleFormChange}
                        className="w-full rounded-md p-2 text-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="twitter" className="text-sm font-medium">
                      Twitter
                    </label>
                    <div className="mt-1 flex shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm border-gray-300 text-gray-500">
                        twitter.com/
                      </span>
                      <input
                        type="text"
                        name="twitter"
                        id="twitter"
                        value={formData.attributes.twitter}
                        onChange={handleFormChange}
                        className="w-full rounded-r-md p-2 text-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="instagram" className="text-sm font-medium">
                      Instagram
                    </label>
                    <div className="mt-1 flex shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm border-gray-300 text-gray-500">
                        instagram.com/
                      </span>
                      <input
                        type="text"
                        name="instagram"
                        id="instagram"
                        value={formData.attributes.instagram}
                        onChange={handleFormChange}
                        className="w-full rounded-r-md p-2 text-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="github" className="text-sm font-medium">
                      GitHub
                    </label>
                    <div className="mt-1 flex shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm border-gray-300 text-gray-500">
                        github.com/
                      </span>
                      <input
                        type="text"
                        name="github"
                        id="github"
                        value={formData.attributes.github}
                        onChange={handleFormChange}
                        className="w-full rounded-r-md p-2 text-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="text-sm font-medium">
                      LinkedIn
                    </label>
                    <div className="mt-1 flex shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm border-gray-300 text-gray-500">
                        linkedin.com/in/
                      </span>
                      <input
                        type="text"
                        name="linkedin"
                        id="linkedin"
                        value={formData.attributes.linkedin}
                        onChange={handleFormChange}
                        className="w-full rounded-r-md p-2 text-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-5">
                  <button
                    type="submit"
                    className="border rounded-md px-3 py-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;