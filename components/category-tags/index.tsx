import { Pressable, ScrollView, View } from "react-native";
import Box, { Row } from "../flex";
import { TextBody, TextBody2 } from "../typography";
import Theme from "../../theme";
import { useCallback } from "react";

interface CategoryTagProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const CategoryTag = ({ label, onSelect, selected }: CategoryTagProps) => {
  return (
    <Pressable onPress={onSelect}>
      <Box
        padding={Theme.spacing.sm}
        backgroundColor={
          selected ? Theme.colors.red : Theme.colors["light-gray"]
        }
        borderRadius={Theme.spacing.lg}
      >
        <TextBody2 color={selected ? "white" : "black"}>{label}</TextBody2>
      </Box>
    </Pressable>
  );
};

interface CategoryListProps {
  categories: string[];
  selected: string[];
  onSelectedChange: (newSelected: string[]) => void;
}

const CategoryList = ({
  categories,
  onSelectedChange,
  selected,
}: CategoryListProps) => {
  const onSelect = useCallback(
    (category: string) => () => {
      if (selected.includes(category)) {
        onSelectedChange([]);
      } else {
        onSelectedChange([category]);
      }
    },
    [selected]
  );
  return (
    <Row>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Row gap={Theme.spacing.sm} marginHorizontal={Theme.spacing.sm}>
          {categories.map((category) => (
            <CategoryTag
              key={category}
              label={category}
              onSelect={onSelect(category)}
              selected={selected.includes(category)}
            />
          ))}
        </Row>
      </ScrollView>
    </Row>
  );
};

export default CategoryList;
