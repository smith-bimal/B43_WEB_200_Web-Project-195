import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import React, { useMemo } from 'react';

// Create styles outside of the component
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 12,
    },
    heading: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#D5D5D5',
        padding: 10,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    table: {
        width: '32%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        marginTop: 5,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#D5D5D5',
        padding: 5,
        marginTop: 15,
    },
    budgetTable: {
        width: '48%',
        padding: 0,
    },
    budgetRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    budgetHeader: {
        width: '50%',
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center',
    },
    budgetCell: {
        width: '50%',
        padding: 5,
        textAlign: 'center',
    },
    budgetTotal: {
        width: '50%',
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center',
    },
    emptybudgetTotal: {
        width: '50%',
        fontWeight: 'bold',
        padding: 12,
        textAlign: 'center',
    },
    activitiesTable: {
        marginVertical: 10,
    },
    activitiesRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    activitiesHeader: {
        width: '33%',
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center',
    },
    activitiesCell: {
        width: '100%',
        padding: 5,
        textAlign: 'left',
    },
    notesSection: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    noteItem: {
        marginVertical: 5,
        lineHeight: 1,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexItem: {
        width: '48%',
    },
});

function TripPDF({ activities = [], packingItems = [], tripName = '', destination = '', dates = {}, budget = [] }) {
    // Sanitize the input data to prevent rendering errors
    const safeData = useMemo(() => ({
        activities: activities?.filter(a => a?.name)?.map(a => ({
            ...a,
            descriptions: Array.isArray(a.descriptions) ? a.descriptions : []
        })) || [],
        packingItems: packingItems?.filter(p => p?.item) || [],
        tripName: String(tripName || '').trim(),
        destination: String(destination || '').trim(),
        dates: {
            startDate: dates?.startDate ? new Date(dates.startDate) : null,
            endDate: dates?.endDate ? new Date(dates.endDate) : null
        },
        budget: budget?.filter(b => b?.title && typeof b.amount === 'number') || []
    }), [activities, packingItems, tripName, destination, dates, budget]);

    const formatDate = (date) => {
        if (!date) return '';
        try {
            return date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            console.log(e.message);
            return '';
        }
    };

    // Sort activities safely
    const sortedActivities = [...safeData.activities].sort((a, b) => {
        const dateA = new Date(a.date || 0);
        const dateB = new Date(b.date || 0);
        return dateA - dateB;
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>{safeData.tripName || 'Trip Details'}</Text>

                <View style={styles.section}>
                    <View style={styles.table}>
                        <Text style={styles.label}>Destination:</Text>
                        <Text style={styles.value}>{safeData.destination || 'Not specified'}</Text>
                    </View>
                    <View style={styles.table}>
                        <Text style={styles.label}>Start Date:</Text>
                        <Text style={styles.value}>{formatDate(safeData.dates.startDate)}</Text>
                    </View>
                    <View style={styles.table}>
                        <Text style={styles.label}>End Date:</Text>
                        <Text style={styles.value}>{formatDate(safeData.dates.endDate)}</Text>
                    </View>
                </View>

                {/* Expenses and Packing List */}
                <View style={styles.flexContainer}>
                    <View style={styles.budgetTable}>
                        <Text style={styles.subHeading}>Expenses</Text>
                        <View style={styles.budgetRow}>
                            <Text style={styles.budgetHeader}>Category</Text>
                            <Text style={styles.budgetHeader}>Amount</Text>
                        </View>
                        {safeData.budget.map((item, index) => (
                            <View key={index} style={styles.budgetRow}>
                                <Text style={styles.budgetCell}>{item.title}</Text>
                                <Text style={styles.budgetCell}>{item.amount}</Text>
                            </View>
                        ))}
                        {/* Extra space for offline additions */}
                        {[...Array(3)].map((_, index) => (
                            <View key={index} style={styles.budgetRow}>
                                <Text style={styles.emptybudgetTotal}></Text>
                                <Text style={styles.emptybudgetTotal}></Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.flexItem}>
                        <Text style={styles.subHeading}>Packing List</Text>
                        {safeData.packingItems.map((item, index) => (
                            <Text key={index} style={styles.noteItem}>• {item.item}</Text>
                        ))}
                        {/* Extra space for offline additions */}
                        {[...Array(4)].map((_, index) => (
                            <Text key={index} style={styles.noteItem}>• </Text>
                        ))}
                    </View>
                </View>

                {/* Activities */}
                <Text style={styles.subHeading}>Activities</Text>
                <View style={styles.activitiesTable}>
                    {sortedActivities.map((activity, index) => (
                        <View key={index} style={styles.activitiesRow}>
                            <Text style={styles.activitiesCell}>{index + 1}. {activity.name}</Text>
                            <View style={{ width: '100%' }}>
                                {activity.descriptions.map((desc, descIndex) => (
                                    <Text key={descIndex} style={styles.activitiesCell}>- {desc}</Text>
                                ))}
                            </View>
                        </View>
                    ))}
                    {/* Extra space for offline additions */}
                    {[...Array(3)].map((_, index) => (
                        <View key={index} style={styles.activitiesRow}>
                            <Text style={styles.activitiesCell}>{index + sortedActivities.length + 1}. </Text>
                            <View style={{ width: '100%' }}>
                                <Text style={styles.activitiesCell}>- </Text>
                                <Text style={styles.activitiesCell}>- </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
}

export const MemoizedTripPDF = React.memo(TripPDF);
export { MemoizedTripPDF as TripPDF };