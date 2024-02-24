import { useEffect, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { AuthorWithWorks } from "./api/hello";
import { Button, Container, Drawer } from "@mui/material";



export default function Home() {
  const [authors, setAuthors] = useState<AuthorWithWorks[]>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const getAuthors = async () => {
    const res = await fetch("/api/hello");
    const json = await res.json();
    setAuthors(json);
  };

  if (!authors) getAuthors();
  console.log(authors);

  return (
    <>
      <Drawer open={openDrawer}>
        <TreeView
          aria-label="icon expansion"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {authors?.map(({ name, works }) => {
            return (
              <TreeItem nodeId={name} label={name}>
                {works.map((w) => {
                  if (!w.sections)
                    return (
                      <TreeItem nodeId={w.title} label={String(w.title)} />
                    );
                  return (
                    <TreeItem nodeId={w.title} label={w.title}>
                      {w.sections.map((s) => (
                        <TreeItem nodeId={String(s)} label={String(s)} />
                      ))}
                    </TreeItem>
                  );
                })}
              </TreeItem>
            );
          })}
        </TreeView>
      </Drawer>
      <Button onClick={() => setOpenDrawer(true)}>Open Drawer</Button>
    </>
  );
}
