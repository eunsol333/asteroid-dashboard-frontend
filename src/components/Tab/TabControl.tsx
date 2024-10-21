import { styled } from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en";
import TabButton from "./TabButtons";
import { tabState } from "./AsteroidTab";
import { Dayjs } from "dayjs";
import { StyledDatePicker } from "../base/DatePicker";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { TextInput } from "../base/TextInput";

const StyledMenu = styled.menu`
  margin: 1rem 0;
  padding: 0;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

interface TabControlProp {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setTabState: React.Dispatch<React.SetStateAction<tabState>>;
  selectedButton: "All" | "Favourite";
}

export default function TabControl({
  startDate,
  endDate,
  setTabState,
  selectedButton,
}: TabControlProp) {
  const updateButtonSelection = (selected: "All" | "Favourite") => {
    setTabState((prev) => {
      return { ...prev, selectedButton: selected };
    });
  };

  const updateStartDate = (startDate: Dayjs | null) => {
    setTabState((prev) => {
      return {
        ...prev,
        startDate: startDate,
      };
    });
  };

  const updateEndDate = (endDate: Dayjs | null) => {
    setTabState((prev) => {
      return { ...prev, endDate: endDate };
    });
  };

  const updateSearch = (searchText: string) => {
    setTabState((prev) => {
      return { ...prev, searchString: searchText };
    });
  };

  const searchHandler = () => {
    setTabState((prev) => {
      return { ...prev, isSearching: true };
    });
  };

  const sortHandler = () => {
    setTabState((prev) => {
      return { ...prev, sort: prev.sort === "asc" ? "desc" : "asc" };
    });
  };

  return (
    <StyledMenu>
      <TabButton
        onClick={() => updateButtonSelection("All")}
        style={{
          backgroundColor: selectedButton == "All" ? "white" : "black",
          color: selectedButton == "All" ? "black" : "white",
        }}
      >
        All
      </TabButton>
      <TabButton
        onClick={() => updateButtonSelection("Favourite")}
        style={{
          backgroundColor: selectedButton == "All" ? "black" : "white",
          color: selectedButton == "All" ? "white" : "black",
        }}
      >
        Favourite
      </TabButton>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <StyledDatePicker
          label="Start"
          value={startDate}
          onChange={(value) => updateStartDate(value)}
          disabled={selectedButton === "Favourite"}
        />
        <StyledDatePicker
          label="End"
          value={endDate}
          onChange={(value) => updateEndDate(value)}
          disabled={selectedButton === "Favourite"}
        />
      </LocalizationProvider>
      <TextInput
        id="outlined-basic"
        label="Search by name"
        variant="outlined"
        onBlur={(event) => updateSearch(event.target.value)}
        disabled={selectedButton === "Favourite"}
      />
      <TabButton
        onClick={searchHandler}
        disabled={selectedButton === "Favourite"}
      >
        Search
      </TabButton>
      <TabButton
        onClick={sortHandler}
        disabled={selectedButton === "Favourite"}
      >
        <SwapVertIcon fontSize="medium" />
      </TabButton>
    </StyledMenu>
  );
}
