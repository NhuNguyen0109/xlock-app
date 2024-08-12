import AccountType from "../types/item";

const addOrderToAccounts = (data: AccountType[]): AccountType[] => {
  const accountOrder: { [key: string]: number } = {};

  return data.map((item) => {
    const siteName = item.name;

    if (accountOrder[siteName]) {
      accountOrder[siteName]++;
    } else {
      accountOrder[siteName] = 1;
    }

    return {
      ...item,
      order: accountOrder[siteName].toString(),
    };
  });
};

export default addOrderToAccounts;
