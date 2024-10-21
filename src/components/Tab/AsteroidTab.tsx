import { useEffect, useState } from "react";
import { styled } from "styled-components";
import TabControl from "./TabControl";
import { Neo } from "../../models/asteroids";
import dayjs, { Dayjs } from "dayjs";
import AsteroidCard from "../AsteroidCard";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTab = styled.div`
  width: 70%;
  display: block;
`;

const StyledTabSection = styled.div`
  height: 30rem;
  background: rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  margin: auto;
`;

export interface tabState {
  asteroids: Neo[];
  selectedButton: "All" | "Favourite";
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  searchString: string;
  isSearching: boolean;
  sort: "asc" | "desc";
}

export default function AsteroidTab() {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);
  const [tabState, setTabState] = useState<tabState>({
    selectedButton: "All",
    asteroids: [],
    startDate: dayjs("2015-09-07"),
    endDate: dayjs("2015-09-08"),
    searchString: "",
    isSearching: true,
    sort: "asc",
  });

  const fetchAsteroids = async () => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      setLoading(true);

      const startDateFormatted = dayjs(tabState.startDate).format("YYYY-MM-DD");
      const endDateFormatted = dayjs(tabState.endDate).format("YYYY-MM-DD");
      const response = await fetch(
        `${baseURL}/asteroids?startDate=${startDateFormatted}&endDate=${endDateFormatted}&searchString=${tabState.searchString}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch asteroids");
      }

      const data: Neo[] = await response.json();
      const synced = syncFavouriteFromLocalStorage(data);
      setTabState((prev) => {
        return {
          ...prev,
          asteroids: synced ?? [],
        };
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error fetching asteroids");
      }
    } finally {
      setLoading(false);
      setTabState((prev) => {
        return {
          ...prev,
          isSearching: false,
          selectedButton: "All",
        };
      });
    }
  };

  const renderAsteroids = (): JSX.Element[] => {
    if (tabState.asteroids.length > 0) {
      return tabState.asteroids.map((asteroid) => (
        <AsteroidCard
          key={asteroid.id}
          asteroid={asteroid}
          setFavourite={favouriteHandler}
        />
      ));
    }

    return [<div key={"NoDataWarning"}>No data found</div>];
  };

  const renderFavouriteAsteroids = (): JSX.Element[] => {
    let favouriteFromLocalStorage: Neo[] = JSON.parse(
      localStorage.getItem("asteroidsFavourites") || "[]"
    );

    if (favouriteFromLocalStorage.length > 0) {
      return favouriteFromLocalStorage.map((asteroid) => (
        <AsteroidCard
          key={asteroid.id}
          asteroid={asteroid}
          setFavourite={favouriteHandler}
        />
      ));
    }

    return [
      <div key={"NoFavouriteWarning"}>No favourites have been selected</div>,
    ];
  };

  const sortHandler = () => {
    var target: Neo[] = tabState.asteroids;
    var sorted = target.sort((a, b) => a.name.localeCompare(b.name));

    if (tabState.sort === "desc") {
      sorted = sorted.reverse();
    }

    if (tabState.selectedButton == "All") {
      setTabState((prev) => {
        return { ...prev, asteroids: sorted };
      });
    }
  };

  const favouriteHandler = (id: string) => {
    let index = tabState.asteroids.findIndex((asteroid) => {
      return asteroid.id === id;
    });

    if (index > -1) {
      let action: "Add" | "Remove" =
        tabState.asteroids[index].is_favourite == true ? "Remove" : "Add";

      var asteroidsUpdated = {
        ...tabState.asteroids[index],
        is_favourite: action == "Remove" ? false : true,
      };

      //Updating browser local storage
      const favouriteFromLocalStorage = JSON.parse(
        localStorage.getItem("asteroidsFavourites") || "[]"
      );

      const itemAlreadyInFavourite = favouriteFromLocalStorage.some(
        (item: Neo) => {
          return item.id === asteroidsUpdated.id;
        }
      );

      let newFavouriteList: Neo[] = favouriteFromLocalStorage;

      if (action == "Add") {
        if (!itemAlreadyInFavourite) {
          newFavouriteList = [...favouriteFromLocalStorage, asteroidsUpdated];
        }
      } else if (action == "Remove") {
        if (itemAlreadyInFavourite) {
          newFavouriteList = favouriteFromLocalStorage.filter((item: Neo) => {
            return item.id != asteroidsUpdated.id;
          });
        }
      }

      localStorage.setItem(
        "asteroidsFavourites",
        JSON.stringify(newFavouriteList)
      );

      //Updating memory
      var asteroidsFullList = tabState.asteroids;
      asteroidsFullList[index] = asteroidsUpdated;

      const synced: Neo[] =
        syncFavouriteFromLocalStorage(asteroidsFullList) ?? [];

      setTabState((prev) => {
        return { ...prev, asteroids: synced };
      });
    }
  };

  const syncFavouriteFromLocalStorage = (asteroids: Neo[]) => {
    const favouriteFromLocalStorage = JSON.parse(
      localStorage.getItem("asteroidsFavourites") || "[]"
    );
    const favouriteList: Neo[] = favouriteFromLocalStorage;
    const newAsteroidsList: Neo[] = asteroids;

    if (favouriteList.length > 0) {
      const indexToUpdate: number[] = [];

      favouriteList.map((favourite) => {
        const favouriteIndex = asteroids.findIndex(
          (asteroid) => asteroid.id === favourite.id
        );
        if (favouriteIndex > -1) {
          indexToUpdate.push(favouriteIndex);
        }
      });

      indexToUpdate.map((ind) => {
        newAsteroidsList[ind].is_favourite = true;
      });
    }
    return newAsteroidsList;
  };

  useEffect(() => {
    if (tabState.isSearching) {
      fetchAsteroids();
    }
  }, [tabState.isSearching]);

  useEffect(() => {
    sortHandler();
  }, [tabState.sort]);

  if (loading) {
    return <CircularProgress color="inherit" />;
  }

  if (error) {
    return <div>Error fetching asteroids from NASA API</div>;
  }

  return (
    <StyledTab>
      <TabControl
        startDate={tabState.startDate}
        endDate={tabState.endDate}
        setTabState={setTabState}
        selectedButton={tabState.selectedButton}
      />
      <StyledTabSection>
        {tabState.selectedButton == "All"
          ? renderAsteroids()
          : renderFavouriteAsteroids()}
      </StyledTabSection>
    </StyledTab>
  );
}
